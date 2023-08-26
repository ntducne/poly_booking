<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\UserRegister;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    private User $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->user->create([
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
