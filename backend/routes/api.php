<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function(){
    Route::get('/admin/login', function (){
        $http = new GuzzleHttp\Client;

        $response = $http->post('http://localhost:8000/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => '64c5384fdefcf221d20e5282',
                'client_secret' => 'T7fB8qXeedwdVGzvVCQYljfQSEMrm7I7RKwp5Phb',
                'username' => 'admin@gmail',
                'password' => '123',
                'scope' => 'admin',
            ],
        ]);

        return json_decode((string) $response->getBody(), true);
    });

});
