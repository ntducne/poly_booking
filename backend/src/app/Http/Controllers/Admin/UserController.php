<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Redis\Connections\Connection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class UserController extends Controller
{
    private User $user;
    private Connection $redis;

    public function __construct()
    {
        $this->user = new User();
        $this->redis = Redis::connection();
    }
    public function index()
    {
        try {
            $cachedUsers = $this->redis->get('users');
            if ($cachedUsers !== null) {
                $users = json_decode($cachedUsers, true);
            } else {
                $users = $this->user->paginate(5);
                $this->redis->set('users', json_encode($users));
            }
            return UserResource::collection($users);
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
            $cachedUser = $this->redis->get('user_' . $id);
            if ($cachedUser !== null) {
                $user = json_decode($cachedUser, true);
            }
            else {
                $user = $this->user->find($id);
                if (!$user) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Người dùng không tồn tại !',
                    ]);
                }
                $this->redis->set('user_' . $id, json_encode($user));
            }
            return response()->json([
                'status' => true,
                'message' => 'Chi tiết người dùng !',
                'data' => new UserResource($user)
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
            $input = $request->validated();
            if(!$user){
                return response()->json([
                    'status' => false,
                    'message' => 'Not found'
                ]);
            }
            $image = $request->file('image');
            if($image){
                $this->DeleteImage($user->image);
                $path = $this->UploadImage($image, 'users/'.$id.'/');
                $input['image'] = $path;
            }
            $user->update($input);
            $this->redis->del('user_' . $id);
            $this->redis->del('users');
            return response()->json([
                'status' => true,
                'data' => $user
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
                    'message' => 'Người dùng không tồn tại !',
                ]);
            }
            $this->redis->del('user_' . $id);
            $this->redis->del('users');
            $user->delete();
            return response()->json([
                'status' => true,
                'data' => $user
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
