<?php

use App\Http\Controllers\Auth\LoginSocicalController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Middleware\CheckReferer;
use App\Http\Middleware\CheckType;

Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});

Route::middleware(CheckReferer::class)->group(function () {
    Route::group(['middleware' => 'throttle:3,5'], function () {
        Route::post('login', [LoginController::class,'index']);
    });
    Route::middleware(CheckType::class)->group(function () {
        Route::post('register', [RegisterController::class,'register']);
//        Route::group(['middleware' => 'throttle:1,1'], function () {
            Route::post('reset-password',        [ForgotPasswordController::class,'sendMail']);
            Route::get('reset-password/{token}', [ForgotPasswordController::class,'checkToken']);
            Route::put('reset-password/{token}', [ForgotPasswordController::class,'reset']);
//        });
    });
    Route::get('/login/{provider}', [LoginSocicalController::class,'redirect']);
    Route::get('/callback/{provider}', [LoginSocicalController::class,'callback']);
});