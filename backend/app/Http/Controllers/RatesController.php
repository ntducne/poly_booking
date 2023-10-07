<?php

namespace App\Http\Controllers;

use App\Models\Rates;

class RatesController extends Controller
{
    public function index()
    {
        $rate = Rates::paginate(5);
        $response = [
            'message' => 'Get MongoDB',
            'data' => $rate
        ];
        return response()->json($response);
    }
}
