<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class GoogleLoginController extends Controller
{
    public function loginUrl(): RedirectResponse
    {
        return Redirect::to(Socialite::driver('google')->stateless()->redirect()->getTargetUrl());
    }
    public function loginCallback(): JsonResponse
    {
        $socialiteUser = Socialite::driver('google')->stateless()->user();
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
}
