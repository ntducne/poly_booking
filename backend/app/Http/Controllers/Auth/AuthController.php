<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function removeUser($userId): void
    {
        DB::table('oauth_access_tokens')->where('user_id', $userId)->delete();
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $input = $request->validated();
        $guard = $request->segment(1);
        $credentials = [
            'email' => $input['email'],
            'password' => $input['password']
        ];
        if (!Auth::guard($guard)->attempt($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Thông tin đăng nhập không hợp lệ !'
            ], 401);
        }
        $user = Auth::guard($guard)->user();
        if ($user->status == 0) {
            $this->removeUser($user->id);
            $tokenResult = $user->createToken(ucfirst($guard) . ' Access Token', [$request->segment(2)]);
            $token = $tokenResult->token;
            $token->save();
            $response = [
                'status' => true,
                'user' => [
                    'image' => $user->image,
                    'name' => $user->name,
                    'role' => $user->role,
                ],
                'accessToken' => [
                    'token' => $tokenResult->accessToken,
                    'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
                ],
            ];
            if ($guard == 'admin') {
                $response['permission'] = $user->getAllPermission();
            }
            return response()->json($response, 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản của bạn đã bị khóa !'
            ], 401);
        }
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $input = $request->validated();
        $input['password'] = Hash::make($input['password']);
        User::create($input);
        return response()->json([
            'status' => true,
            'message' => 'Đăng ký thành công !'
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $user_id = $request->user()->_id;
        $request->user()->token()->revoke();
        $this->removeUser($user_id);
        return response()->json(['status' => true, 'msg' => 'Bạn đã đăng xuất !']);
    }
}
