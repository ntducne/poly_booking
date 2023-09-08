<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;

class LoginSocicalController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        return Redirect::to(Socialite::driver($request->segment(4))->stateless()->redirect()->getTargetUrl());
    }
    public function callback(Request $request): JsonResponse
    {
        $guard = $request->segment(2);
        $socialiteUser = Socialite::driver($request->segment(4))->stateless()->user();
        if($guard == 'admin'){
            $admin = Admin::where('email', $socialiteUser->getEmail())->first();
            return $this->extracted($admin, $guard);
        }
        else if($guard == 'user'){
            $user = User::where('email', $socialiteUser->getEmail())->first();
            return $this->extracted($user, $guard);
        }
    }

    /**
     * @param $user
     * @param string $guard
     * @return JsonResponse
     */
    public function extracted($user, string $guard): JsonResponse
    {
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ]);
        }
        $tokenResult = $user->createToken(ucfirst($guard) . ' Access Token', [$guard]);
        $token = $tokenResult->token;
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
}
