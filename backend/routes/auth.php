<?php

use App\Http\Controllers\Auth\LoginSocicalController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Middleware\CheckReferer;
use App\Http\Middleware\CheckType;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});

Route::middleware(CheckReferer::class)->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware(CheckType::class)->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('reset-password', [ForgotPasswordController::class, 'sendMail']);
        Route::get('reset-password/{token}', [ForgotPasswordController::class, 'checkToken']);
        Route::put('reset-password', [ForgotPasswordController::class, 'reset']);
    });
    Route::get('/login/{provider}', [LoginSocicalController::class, 'redirect']);
    Route::get('/callback/{provider}', [LoginSocicalController::class, 'callback']);
});
