<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Exception;
use App\Services\UserService;

class UserController extends Controller
{
    private UserService $user;

    public function __construct(UserService $userService)
    {
        $this->user = $userService;
    }
    public function index(Request $request): JsonResponse
    {
        try {
            $users = $this->user->all($request);
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
            $user = $this->user->update($request, $id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Có lỗi xảy ra !',
                ]);
            }
            return response()->json([
                'status' => true,
                'message' => $user
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
            $user = $this->user->delete($id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Có lỗi xảy ra !',
                ]);
            }
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
}
