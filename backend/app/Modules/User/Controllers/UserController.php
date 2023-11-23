<?php

namespace App\Modules\User\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ChangePasswordRequest;
use App\Http\Requests\Client\UpdateAvatarRequest;
use App\Http\Requests\Client\UpdateProfileRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\Billing;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\User;
use App\Modules\Orders\Resources\BillingResource;
use App\Modules\User\Resources\UserResource;
use App\Repositories\RoomRepository;
use app\Repositories\UserRepository;
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
            $users = $this->user->paginate(10);
            return response()->json([
                'status' => true,
                'message' => 'Danh sách người dùng !',
                'data' => UserResource::collection($users)
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
    public function cancelBooking($id)
    {
        $billing = Billing::find($id);
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
                'message' => 'Room not found'
            ], 404);
        }
        $input = $request->all();

        $images = $request->file('images');
        if ($images) {
            $uploadedFileUrl = $this->UploadMultiImage($images, 'rate_room/' . $room->id . '/');
            $input['images'] = $uploadedFileUrl;
        }
        $input['user_id'] = $request->user()->id;
        $rate = $this->rate_room->create($input);
        return response()->json([
            'message' => 'Rate room successfully',
            'data' => $rate
        ], 201);
    }

}
