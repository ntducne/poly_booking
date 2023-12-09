<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;

class LoginSocicalController extends Controller
{
    public function removeUser($userId): void
    {
        DB::table('oauth_access_tokens')->where('user_id', $userId)->delete();
    }

    public function redirect(Request $request): RedirectResponse
    {
        return Redirect::to(Socialite::driver($request->segment(3))->stateless()->redirect()->getTargetUrl());
    }

    public function callback(Request $request)
    {
        $guard = $request->segment(1);
        $socialiteUser = Socialite::driver($request->segment(3))->stateless()->user();
        $column = 'email';
        $email = $socialiteUser->getEmail();
        $user = User::where($column, $email)->first();
        return $this->extracted($user, $guard);
    }

    public function extracted($user, string $guard): JsonResponse
    {
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản không tồn tại !'
            ], 401);
        }
        if ($user->status == 0) {
            $this->removeUser($user->id);
            $tokenResult = $user->createToken(ucfirst($guard) . ' Access Token', [$guard]);
            $token = $tokenResult->token;
            $token->save();
            $response = [
                'status' => true,
                'user' => [
                    'image' => $user->image,
                    'name' => $user->name,
                ],
                'accessToken' => [
                    'token' => $tokenResult->accessToken,
                    'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
                ],
            ];
            return response()->json($response, 200);
        } 
        else {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản của bạn đã bị khóa !'
            ], 401);
        }
    }
}
