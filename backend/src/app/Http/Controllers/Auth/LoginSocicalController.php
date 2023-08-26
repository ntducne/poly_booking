<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $socialiteUser = Socialite::driver($request->segment(4))->stateless()->user();
        $user = User::query()
            ->firstOrCreate(
                ['email' => $socialiteUser->getEmail(),],
                [
                    'email_verified_at' => now(),
                    'name' => $socialiteUser->getName(),
                    'google_id' => $socialiteUser->getId(),
                    'avatar' => $socialiteUser->getAvatar(),
                ]
            );

        return response()->json([
            'user' => $user,
        ]);
    }
    function createUser($getInfo,$provider){
        $user = User::where('provider_id', $getInfo->id)->first();
        if (!$user) {
            $user = User::create([
                'name'     => $getInfo->name,
                'email'    => $getInfo->email,
//                'provider' => $provider,
//                'provider_id' => $getInfo->id
            ]);
        }
        return $user;
    }
}
