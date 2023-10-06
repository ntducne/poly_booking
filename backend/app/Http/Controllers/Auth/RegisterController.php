<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\UserRegister;
use app\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    private UserService $user;
    public function __construct(UserService $userService)
    {
        $this->user = $userService;
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->user->newUsers([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);
        $user->notify(new UserRegister($user->name));
        return response()->json([
            'message' => 'Đăng ký thành công !',
            'user' => $user,
        ]);
    }
}
