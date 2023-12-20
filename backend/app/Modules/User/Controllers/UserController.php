<?php

namespace App\Modules\User\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\User;
use App\Modules\Orders\Resources\BillingResource;
use App\Modules\User\Requests\ChangePasswordRequest;
use App\Modules\User\Requests\UpdateAvatarRequest;
use App\Modules\User\Requests\UpdateProfileRequest;
use App\Modules\User\Requests\UserUpdateRequest;
use App\Modules\User\Resources\UserResource;
use App\Repositories\RoomRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    private UserRepository $userRepository;
    private RoomRepository $roomRepository;
    private RateRoom $rate_room;
    private Room $room;
    private User $user;

    public function __construct(
        UserRepository $userRepository,
        RoomRepository $roomRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->roomRepository = $roomRepository;
        $this->rate_room = new RateRoom();
        $this->room = new Room();
        $this->user = new User();
    }
    public function index(Request $request): JsonResponse
    {
        try {
            $users = $this->user->newQuery();
            if ($request->has('name')) {
                $searchTerm = $request->input('name');
                $users->where('name', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('email')) {
                $searchTerm = $request->input('email');
                $users->where('email', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('phone')) {
                $searchTerm = $request->input('phone');
                $users->where('phone', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('status')) {
                $searchTerm = $request->input('status');
                $users->where('status', $searchTerm);
            }
            return response()->json([
                'status' => true,
                'message' => 'Danh sách người dùng !',
                'data' => UserResource::collection($users->paginate(10))
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function show($id): JsonResponse
    {
        try {
            $user = $this->user->find($id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Người dùng không tồn tại !',
                ]);
            }
            return response()->json([
                'status' => true,
                'message' => 'Chi tiết người dùng !',
                'data' => new UserResource($user),
//                'booking' => $user->bookingHistory()
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function update(UserUpdateRequest $request, $id): JsonResponse
    {
        try {
            $user = $this->user->find($id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Có lỗi xảy ra !',
                ]);
            }
            $user->update($request->all());
            return response()->json([
                'status' => true,
                'message' => new UserResource($user),
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function destroy($id): JsonResponse
    {
        try {
            $user = $this->user->find($id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Có lỗi xảy ra !',
                ]);
            }
            $user->delete();
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công !'
            ]);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }

    public function profile(Request $request)
    {
        return response()->json([
            'message' => new UserResource($request->user()),
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
            'data' => User::find($request->user()->id)
        ], 200);
    }
    public function changePassword(ChangePasswordRequest $request)
    {
        $check = $this->userRepository->updatePassword($request, $request->user()->id);
        if(!$check){
            return response()->json([
                'message' => 'Mật khẩu cũ không đúng !',
            ], 400);
        }
        return response()->json([
            'message' => 'Change password successfully',
            'data' => $request->user()
        ], 200);
    }
    public function bookingHistory(Request $request)
    {
        return $this->userRepository->bookingHistory($request);
    }
    public function booking(Request $request)
    {
        try {
            return $this->roomRepository->processBooking($request);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được đặt phòng !'
            ]);
        }
    }
    public function cancelBooking(Request $request, $id)
    {
        $billing = Billing::where('_id', $id)->whereIn('status', [
            0, 1
        ])->where('user_id', $request->user()->id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $billing->update(['status' => 2]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Huỷ phòng thành công !',
                'data' => $billing
            ]);
        }
    }
    public function bookingDetail($id)
    {
        return new BillingResource(Billing::find($id));
    }
    public function rate(Request $request)
    {
        $room = $this->room->find($request->room_id);
        if (!$room) {
            return response()->json([
                'status' => false,
                'message' => 'Room not found'
            ], 404);
        }
        $check = false;
        $message = 'Bạn không thể đánh giá phòng này do chưa từng đặt phòng !';
        if ($request->user()) {
            $userId = $request->user()->id;
            $billing = Billing::where('user_id', $userId)->where('status', 4)->orderBy('_id','desc')->get();
            foreach ($billing as $item) {
                $countBookdetail = BookDetail::where('room_id', $room->id)->where('booking_id', $item->booking_id)->pluck('booking_id');
                $countBooking = Booking::whereIn('_id', $countBookdetail)->count();
                $countRate = RateRoom::where('room_id', $room->id)->where('user_id', $userId)->count();
                if($countBooking > $countRate){
                    $bookDetail = BookDetail::where('booking_id', $item->booking_id)->where('room_id', $room->id)->orderBy('id', 'desc')->first();
                    if ($bookDetail) {
                        $booking = Booking::where('_id', $bookDetail->booking_id)->first();
                        if ($booking && Carbon::parse($booking->checkout)->addDays(3)->isPast()) {
                            $check = false;
                            $message = 'Quá thời gian đánh giá !';
                        } else {
                            $check = true;
                        }
                        break;
                    }
                }
                if($countBooking == $countRate){
                    $check = false;
                    $message = 'Bạn đã đánh giá phòng này !';
                }
            }
        }
        if(!$check){
            return response()->json([
                'status' => false,
                'message' => $message
            ], 400);
        }
        $input = $request->all();
        $images = $request->file('images');
        if ($images) {
            $uploadedFileUrl = $this->UploadMultiImage($images, 'rate_room/' . $room->id . '/');
            $input['images'] = $uploadedFileUrl;
        }
        $input['user_id'] = $request->user()->id;
        $input['time'] = date('Y-m-d H:i:s');
        $rate = $this->rate_room->create($input);
        return response()->json([
            'status' => true,
            'message' => 'Rate room successfully',
            'data' => $rate
        ], 201);
    }
}