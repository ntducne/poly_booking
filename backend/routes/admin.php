<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/profile', function (){
    return response()->json([
        'status' => true,
        'data' => [
            'name' => 'ahihi',
        ]
    ]);
});

Route::post('/refresh_token', function (Request $request) {
    $response = Http::post('/oauth/token', [
        'grant_type'    => 'refresh_token',
        'refresh_token' => $request->user()->token()->refresh_token,
        'client_id'     => env('ADMIN_CLIENT_ID'),
        'client_secret' => env('ADMIN_CLIENT_SECRET'),
        'scope'         => 'admin',
    ]);
    return $response->json();
});
