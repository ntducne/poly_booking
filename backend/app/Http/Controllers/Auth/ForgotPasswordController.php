<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPassword;
use App\Models\PasswordReset;
use App\Models\User;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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
            ], 422);
        }
        $this->passwordReset->where('email', $user->email)->delete();
        $passwordReset = $this->passwordReset->create([
            'email' => $user->email,
            'token' => Str::random(50),
        ], 200);
        if ($passwordReset) {
            $user->notify(new ResetPasswordRequest($passwordReset->token));
        }
        return response()->json([
            'status' => true,
            'message' => 'Chúng tôi đã gửi một email để đặt lại mật khẩu của bạn !',
        ], 200);
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
                    'message' => 'Token không hợp lệ !',
                ], 422);
            }
            return response()->json([
                'status' => true,
                'message' => 'Token hợp lệ !',
            ], 200);
        }
        else {
            return response()->json([
                'status' => false,
                'message' => 'Token is invalid.',
            ], 422);
        }

    }
    public function reset(ForgotPassword $request): JsonResponse
    {
        $passwordReset = $this->passwordReset->where('token', $request->token)->first();
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(10)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'status' => false,
                'message' => 'Token hết hạn !',
            ], 422);
        }
        $user = $this->user->where('email', $passwordReset->email)->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Chúng tôi không thể tìm thấy người dùng với địa chỉ email này !',
            ], 422);
        }
        // if (!Hash::check($request->old_password, $user->password)) {
        //     return response()->json([
        //         'status' => false,
        //         'error' => 'Mật khẩu cũ không chính xác !',
        //     ], 422);
        // }
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);
        $passwordReset->delete();
        return response()->json([
            'status' => true,
            'success' => 'Đặt lại mật khẩu thành công !',
        ]);
    }
}
