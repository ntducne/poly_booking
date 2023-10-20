<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\Services;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    private Billing $billing;

    public function __construct()
    {
        $this->billing = new Billing();
        $this->history = new HistoryHandleBooking();
    }

    public function index(): JsonResponse
    {
        $data = $this->billing->all();
        return response()->json($data);
    }

    public function show($id): JsonResponse
    {
        $data = $this->billing->find($id);
        return response()->json($data->bookingInBilling());
    }

    public function store($id): JsonResponse
    {
        $booking = Booking::find($id);
        $room_id = BookDetail::where('booking_id','=',$booking->_id)->first()->room_id;
        $branch_id = Room::find($room_id)->branch_id;
        $datediff = abs(strtotime($booking->checkin) - strtotime($booking->checkout));
        $amount_day = floor($datediff / (60 * 60 * 24)); // so ngay khach hang dat
        $bill = [
            'booking_id' => $booking->_id,
            'services' => [],
            'total' => $booking->price_per_night * $amount_day,
            // total = so ngay su dung phong * gia 1 dem 
            'payment_method' => 0, //thanh toan tai quay
            'payment_date' => null,
            'branch_id' => $branch_id,
            'status' => 'pending'
        ];
        $data = $this->billing->create($bill);
        return response()->json($data);
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
            $update = $this->billing->where('booking_id', '=', $request->booking_id)->update(['services' => $services_valid]);
            if ($update) {
                $param = [
                    'booking_id' => $request->booking_id,
                    'admin_id' => $request->admin_id,
                    'handle' => $request->handle,
                    'time' => now()->toDateTimeString(),
                ];
                $history_handle = $this->history->create($param);
            }
            //update lai total trong billing cua booking
            foreach ($services_id as $key => $value) {
                $total_price += Services::find($value)->price;
            }
            $update_billing = $this->billing->where('booking_id', '=', $request->booking_id)->update(['total' => $total_price]);

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
