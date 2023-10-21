<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\Services;
use App\Repositories\BookingRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    private Billing $billing;
    private HistoryHandleBooking $history;
    private BookingRepository $bookingRespository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRespository = $bookingRepository;
        $this->billing = new Billing();
        $this->history = new HistoryHandleBooking();
    }

    public function index()
    {
        return $this->bookingRespository->orderList();
    }

    public function show($id)
    {
        return $this->bookingRespository->orderDetail($id);
    }

    public function order_service_user(Request $request)
    {
        try {
            $bill = $this->billing->where('booking_id', '=', $request->booking_id)->first();
            $services = $bill->services;
            $services_id = []; //mang chua id services hop le
            $total_price = $bill->total; // gia goc chua tinh service
            //kiem tra dich vu da duoc su dung hay chua
            foreach ($request->services as $key => $value) {
                if (in_array($value, $services)) {
                    return response()->json([
                        'message' => 'Dịch vụ đã được sử dụng '
                    ]);
                } else {
                    $services_id[] = $value;
                }
            }
            $services_valid = array_merge($services, $services_id);
            //update lai total trong billing cua booking
            foreach ($services_id as $key => $value) {
                $total_price += Services::find($value)->price;
            }
            $update = $this->billing->where('booking_id', '=', $request->booking_id)->update(['services' => $services_valid,'total' => $total_price]);
            if ($update) {
                $param = [
                    'booking_id' => $request->booking_id,
                    'admin_id' => $request->admin_id,
                    'handle' => $request->handle,
                    'time' => now()->toDateTimeString(),
                ];
                $history_handle = $this->history->create($param);
            }
            
            return response()->json(
                [
                    'message' => 'Xử lý thành công',
                    'history_handle' => $history_handle
                ]
            );
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không order được dịch vụ cho khách !'
            ]);
        }

    }

    public function update($id): JsonResponse
    {
        $data = $this->billing->find($id);
        $data->update([
            'status' => 'paid'
        ]);
        return response()->json($data);
    }

    public function destroy($id): JsonResponse
    {
        $data = $this->billing->find($id);
        $data->delete();
        return response()->json($data);
    }

    public function destroyAll(): JsonResponse
    {
        $data = $this->billing->truncate();
        return response()->json($data);
    }



}
