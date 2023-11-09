<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\ChangePasswordRequest;
use App\Http\Requests\Client\UpdateAvatarRequest;
use App\Http\Requests\Client\UpdateProfileRequest;
use App\Http\Requests\RateRoom\RateStoreRequest;
use App\Http\Resources\UserResource;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private RateRoom $rate_room;
    private Room $room;
    // private UserRepository $userRepository;

    public function __construct()
    {
        // $this->userRepository = $userRepository;
        $this->rate_room = new RateRoom();
        $this->room = new Room();
        $this->booking = new Booking();
        $this->book_detail = new BookDetail();
    }

    public function profile(Request $request)
    {
        // $user = $this->userRepository->find(->id);
        return response()->json([
            'message' => $request->user(),
        ], 200);
    }
    public function updateAvatar(UpdateAvatarRequest $request)
    {
        $this->userRepository->updateAvatar($request, $request->user()->id);
        return response()->json([
            'message' => 'Update avatar successfully',
            'data' => $request->user()
        ], 200);
    }
    public function updateProfile(UpdateProfileRequest $request)
    {
        $this->userRepository->updateProfile($request, $request->user()->id);
        return response()->json([
            'message' => 'Update profile successfully',
            'data' => $request->user()
        ], 200);
    }
    public function changePassword(ChangePasswordRequest $request)
    {
        $this->userRepository->updatePassword($request, $request->user()->id);
        return response()->json([
            'message' => 'Change password successfully',
            'data' => $request->user()
        ], 200);
    }
    public function bookingHistory(Request $request)
    {
        $history = $this->userRepository->bookingHistory($request->user()->id);
        return response()->json([
            'message' => 'Get booking history successfully',
            'data' => $history
        ], 200);
    }
    public function booking(Request $request)
    {
        $soLuong = $request->soLuong;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        (int) $adults = $request->adults;
        (int) $children = $request->children;
        $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adult', 'child']);
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->first();
        //Kiem tra phong con trong hay khong
        $room_valid = $this->check_room($request->checkin, $request->checkout, $request->adults, $request->children, $branch_id, $room->room_type_id);
        $total_adults = 0;
        $total_children = 0;
        $total_discount = 0;
        $total_price_per_night = 0;
        foreach ($room_valid as $key => $value) {
            $total_adults += Room::find($value)->adults;
            $total_children += Room::find($value)->children;
            $total_discount += Room::find($value)->discount;
            $total_price_per_night += RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night;
        }
        //Bat loi dat so nguoi 
        if ($adults > $total_adults && $children > $total_children) {
            return response()->json([
                'message' => 'Phòng không đủ chỗ '
            ]);
        }
        //Bat loi dat so luong phong
        if (count($room_valid) < $soLuong) {
            return response()->json([
                'message' => 'Không đủ phòng trống !'
            ]);
        }

        $param['room_type'] = $room->room_type_id;
        $param['booking_date'] = now()->toDateTimeString();
        $param['price_per_night'] = $total_price_per_night - $total_discount; // gia 1 dem cua booking
        $param['amount_people'] = [
            'total_people' => $total_adults + $total_children,
            'total_adults' => $total_adults,
            'total_children' => $total_children
        ];
        $param['amount_room'] = $soLuong;
        //Lay ra id user neu ho da co tai khoan tu truoc
        $user = User::where('email', '=', $request->representative['email'])->first();
        $param['user_id'] = !empty($user) ? $user->_id : null;

        //phong co the dat 
        $room_booking = array_slice($room_valid, 0, $soLuong);
        $create = $this->booking->create($param);
        $details = [];
        foreach ($room_booking as $key => $value) {
            $details[] = [
                'booking_detail' => $this->book_detail->create(
                    [
                        'booking_id' => $create->_id,
                        'room_id' => $value,
                        'room_name' => Room::find($value)->name
                    ]
                ),
                'info_room' => [
                    'name' => Room::find($value)->name,
                    'price' => RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night - Room::find($value)->discount
                ]
            ];
        }
        //Hoa don 
        $datediff = abs(strtotime($request->checkin) - strtotime($request->checkout));
        $amount_day = floor($datediff / (60 * 60 * 24));
        // so luong ngay
        $bill = [
            'booking_id' => $create->_id,
            'services' => [],
            'total' => $param['price_per_night'] * $amount_day,
            // total = so ngay su dung phong * gia 1 dem 
            'payment_method' => 0,
            //thanh toan tai quay
            'payment_date' => null,
            'branch_id' => $branch_id
        ];
        $billing = Billing::create($bill);

        return response()->json([
            'message' => 'Đặt thành công !',
            'booking' => $create,
            'details' => $details,
            'bill' => $billing
        ]);
    }
    public function cancelBooking($id)
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update(['status' => true]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }
    public function bookingDetail($id)
    {
        $booking = Booking::find($id);
        $detail = $booking->getDetail();
        return response()->json([
            'message' => 'Get booking detail successfully',
            'data' => [
                'booking' => $booking,
                'detail' => $detail
            ]
        ], 200);
    }
    public function rate(Request $request, $id_room)
    {
        $room = $this->room->find($id_room);
        if (!$room) {
            return response()->json([
                'message' => 'Room not found'
            ], 404);
        }
        $input = $request->all();
        $images = $request->file('images');
        if ($images) {
            $uploadedFileUrl = $this->UploadMultiImage($images, 'rate_room/' . $id_room . '/');
            $input['images'] = json_encode($uploadedFileUrl);
        }
        $rate = $this->rate_room->create($input);
        return response()->json([
            'message' => 'Rate room successfully',
            'data' => $rate
        ], 201);
    }

}
