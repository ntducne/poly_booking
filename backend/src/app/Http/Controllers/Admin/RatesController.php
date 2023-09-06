<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rates;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redis;

class RatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected Rates $rates;
    public function __construct() {
        $this->rates = new Rates();
    }
    public function index()
    {
        $cacheRates = Redis::get('rates');
        if ($cacheRates !== null) {
            $rate = json_decode($cacheRates, true);
            $response = [
                'message' => 'Get Redis',
                'data' => $rate 
            ];
        } else {
            $rate = $this->rates->paginate(5);
            Redis::set('rates', json_encode($rate));
            $response = [
                'message' => 'Get MongoDB',
                'data' => $rate
            ];
        }
        return response()->json($response);
    }
    public function show($id)
    {
        $rate = Rates::find($id);
        if (!$rate) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        } else {
            $cacheRates = Redis::get('rates_' . $id);
            if ($cacheRates !== null) {
                $rate = json_decode($cacheRates, true);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết Rate !',
                'data' => $rate
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
