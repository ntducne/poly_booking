<?php

namespace App\Http\Controllers;

use App\Http\Requests\RateRoom\RateStoreRequest;
use App\Http\Resources\UserResource;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\RateRoom;
use App\Models\Room;
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
    }

    public function profile(Request $request){
        // $user = $this->userRepository->find(->id);
        return response()->json([
            'message' => $request->user(),
        ], 200);
    }
    public function updateAvatar(Request $request){
        $this->userRepository->updateAvatar($request, $request->user()->id);
        return response()->json([
            'message' => 'Update avatar successfully',
            'data'    => $request->user()
        ], 200);
    }
    public function updateProfile(Request $request){
        $this->userRepository->updateProfile($request, $request->user()->id);
        return response()->json([
            'message' => 'Update profile successfully',
            'data'    => $request->user()
        ], 200);
    }
    public function changePassword(Request $request){
        $this->userRepository->updatePassword($request, $request->user()->id);
        return response()->json([
            'message' => 'Change password successfully',
            'data'    => $request->user()
        ], 200);
    }
    public function bookingHistory(Request $request){
        $history = $this->userRepository->bookingHistory($request->user()->id);
        return response()->json([
            'message' => 'Get booking history successfully',
            'data'    => $history
        ], 200);
    }
    public function booking(Request $request)
    {
        $booking = new Booking();
        $soLuong = $request->soLuong;
        $room_id = $request->room_id; // id phong ma khach dat
        $branch_id = $request->branch_id;
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->get(); //tra ve du lieu phong ma khach muon dat
        //dat phong
        $param = $request->except(['soLuong', 'room_id', 'branch_id']);
        $price_per_night = 100000;
        $param['price_per_night'] = ($price_per_night == null ? 100000 : $price_per_night);
        $create = $booking->create($param);
        if ($create) {
            $bookDetail = new BookDetail();
            //neu so luong la 1
            $bookDetail->create(
                [
                    'booking_id' => $create->_id,
                    'room_id' => $room_id,
                    'room_name' => $room[0]->room_name,
                ]
            );
            $response = [
                'status' => 'success',
                'message' => 'Đặt thành công',
                'data' => $create,
            ];
            if ($soLuong > 1) {
                //danh sach phong lien quan den phong muon dat
                $listroom = Room::where('room_type_id', '=', $room[0]->room_type_id)->where('branch_id', '=', $branch_id)->where('_id', '!=', $room_id)->get();
                $count = 1;
                $arrRoom = []; // mang nay chua cac phong phu hop sau khi loc
                foreach ($listroom as $item1) {
                    //lay tat ca du lieu co cung room_id
                    $checkRoom = BookDetail::where('room_id', '=', $item1->_id)->get();
                    // dd($checkRoom);
                    if (empty($checkRoom)) { //kiem tra mang co rong hay ko
                        $arrRoom[] = $item1->_id;
                    } else {
                        $checkoutMax = 0;
                        $checkinMin = strtotime($request->checkin);
                        foreach ($checkRoom as $item) {
                            //lay ra check in check out cua phong theo book detail join booking
                            $checkBookingRoom = $booking->where('_id', '=', $item->booking_id)->where('status', '=', false)->get();
                            if ($checkoutMax < strtotime($checkBookingRoom[0]->checkout)) {
                                $checkoutMax = strtotime($checkBookingRoom[0]->checkout);
                            }
                            if ($checkinMin > strtotime($checkBookingRoom[0]->checkin)) {
                                $checkinMin = strtotime($checkBookingRoom[0]->checkin);
                            }
                        }
                        // dd([date('Y-m-d', $checkoutMax), date('Y-m-d', $checkinMin)]);
                        if (strtotime($create->checkout) < $checkinMin || $checkoutMax < strtotime($create->checkin)) { // kiem tra lich dat phong co
                            $arrRoom[] = $item1->_id;
                        }
                    }
                }
                foreach ($arrRoom as $key => $value) {
                    if ($count == $soLuong) {
                        return $response = [
                            'status' => 'success',
                            'message' => 'Đặt thành công',
                            'data' => $create,
                        ];
                    }
                    $bookDetail->create(
                        [
                            'booking_id' => $create->_id,
                            'room_id' => $value,
                            'room_name' => Room::find($value)->room_name,
                        ]
                    );
                    $count++;
                }
            }
        }
        return response()->json($response);
    }
    public function cancelBooking($id){
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
    public function bookingDetail($id){
        $booking = Booking::find($id);
        $detail = $booking->getDetail();
        return response()->json([
            'message' => 'Get booking detail successfully',
            'data'    => [
                'booking' => $booking,
                'detail'  => $detail
            ]
        ], 200);
    }
    public function rate(Request $request, $id_room){
        $room = $this->room->find($id_room);
        if(!$room){
            return response()->json([
                'message' => 'Room not found'
            ], 404);
        }
        $input  = $request->validated();
        $images = $request->file('images');
        if($images){
            $uploadedFileUrl = $this->UploadMultiImage($images,'rate_room/'.$id_room.'/');
            $input['images'] = json_encode($uploadedFileUrl);
        }
        $rate = $this->rate_room->create($request->validated());
        $this->rate_room->create($input);
        return response()->json([
            'message' => 'Rate room successfully',
            'data'    => $rate
        ], 201);
    }

}
