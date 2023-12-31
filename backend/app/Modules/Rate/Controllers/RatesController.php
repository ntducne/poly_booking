<?php

namespace App\Modules\Rate\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RateResource;
use Exception;
use Illuminate\Http\Request;
use App\Models\RateRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class RatesController extends Controller
{
    protected RateRoom $rates;
    public function __construct()
    {
        $this->rates = new RateRoom();
    }
    public function index(Request $request)
    {
        try {
            $rate = $this->rates->newQuery();
            if ($request->has('room_id')) {
                $rate->where('room_id', $request->room_id);
            }
            return RateResource::collection($rate->paginate(10));
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
            $rate = RateRoom::find($id);
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
}