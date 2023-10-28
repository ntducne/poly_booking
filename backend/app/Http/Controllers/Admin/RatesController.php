<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RateResource;
use Exception;
use Illuminate\Http\Request;
use App\Models\Rates;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class RatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected Rates $rates;
    public function __construct()
    {
        $this->rates = new Rates();
    }
    public function index()
    {
        try {
            $rate = $this->rates->paginate(5)->withQueryString();
            return RateResource::collection($rate);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không lấy ra được dữ liệu đánh giá !'
            ]);
        }
    }
    public function show($id)
    {
        try {
            $rate = Rates::find($id);
            if (!$rate) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Booking không tồn tại !',
                    'data' => null
                ]);
            } else {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Chi tiết Rate !',
                    'data' => new RateResource($rate)
                ]);
            }
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không lấy ra được dữ liệu đánh giá !'
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
