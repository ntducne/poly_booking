<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use App\Models\User;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{

    private User $user;
    private PasswordReset $passwordReset;

    public function __construct()
    {
        $this->user = new User();
        $this->passwordReset = new PasswordReset();
    }

    public function sendMail(Request $request): JsonResponse
    {
        $user = $this->user->where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'error' => 'Email không tồn tại !',
            ]);
        }
        $this->passwordReset->where('email', $user->email)->delete();
        $passwordReset = $this->passwordReset->create([
            'email' => $user->email,
            'token' => Str::random(50),
        ]);
        if ($passwordReset) {
            $user->notify(new ResetPasswordRequest($passwordReset->token));
        }
        return response()->json([
            'status' => true,
            'message' => 'We have e-mailed your password reset link!',
        ]);
    }
    public function checkToken(Request $request): JsonResponse
    {
        $token = $request->segment(4);
        $passwordReset = $this->passwordReset->where('token', $token)->first();
        if($passwordReset){
            if (Carbon::parse($passwordReset->updated_at)->addMinutes(10)->isPast()) {
                $passwordReset->delete();
                return response()->json([
                    'status' => false,
                    'message' => 'This password reset token is invalid.',
                ]);
            }
            return response()->json([
                'status' => true,
                'message' => 'This password reset token is valid.',
            ]);
        }
        else {
            return response()->json([
                'status' => false,
                'message' => 'Token is invalid.',
            ]);
        }

    }
    public function reset(Request $request): JsonResponse
    {
        $token = $request->segment(4);
        $passwordReset = $this->passwordReset->where('token', $token)->first();
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(10)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'status' => false,
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        $user = $this->user->where('email', $passwordReset->email)->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'We can\'t find a user with that e-mail address.',
            ]);
        }
        $user->update(array('password' => Hash::make($request->new_password)));
        $passwordReset->delete();
        return response()->json([
            'status' => true,
            'success' => 'Password reset successfully!',
        ]);
    }
}
