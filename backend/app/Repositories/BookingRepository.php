<?php

namespace App\Repositories;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Services;
use App\Modules\Orders\Resources\BillingResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Carbon;

class BookingRepository
{
    private Booking $booking;
    private Billing $billing;
    private HistoryHandleBooking $history_handle;

    public function __construct()
    {
        $this->booking = new Booking();
        $this->booking_detail = new BookDetail();
        $this->room = new Room();
        $this->room_type = new RoomType();
        $this->billing = new Billing();
        $this->history_handle = new HistoryHandleBooking();
    }

    public function orderList(): AnonymousResourceCollection
    {
        return BillingResource::collection($this->billing->paginate(10));
    }

    public function orderDetail($id): BillingResource
    {
        return new BillingResource($this->billing->find($id));
    }

    public function addService($request)
    {
        $services = $request->services;
        $arrService = [];
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        $total = 0;
        if(count($billing->services) > 0){
            foreach ($services as $key => $value) {
                $service = Services::find($value);
                $existingService = array_filter($billing->services, function ($item) use ($service) {
                    return $item['service_id'] == $service->_id;
                });
                if (empty($existingService)) {
                    $arrService[] = [
                        'service_id' => $service->_id,
                        'service_name' => $service->service_name,
                        'price' => $service->price,
                        'time' => Carbon::now()->format('Y-m-d H:i:s'),
                    ];
                    $total += $service->price;
                }
            }
            $newArr = array_merge($billing->services, $arrService);
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $newArr,
                'total' => $billing->total + $total,
            ]);
        }
        else {
            foreach ($services as $key => $value) {
                $service = Services::find($value);
                $arrService[] = [
                    'service_id' => $service->_id,
                    'service_name' => $service->service_name,
                    'price' => $service->price,
                    'time' => Carbon::now()->format('Y-m-d H:i:s'),
                ];
                $total += $service->price;
            }
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $arrService,
                'total' => $billing->total + $total,
            ]);
        }
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Thêm dịch vụ',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Thêm dịch vụ thành công !',
            'data' => $values
        ];
    }

    public function addPeople($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status != 3) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chưa nhận phòng không thể thêm người !',
                'data' => null
            ]);
        }
        $booking = $this->booking->where('_id', '=', $billing->booking_id)->first();
        $booking_old_people = $booking->people;
        if($booking_old_people !== null){
            $newPeople = array_merge($booking_old_people, $request->peoples);
            $this->booking->where('_id', '=', $billing->booking_id)->update([
                'people' => $newPeople
            ]);
        }
        else {
            $this->booking->where('_id', '=', $billing->booking_id)->update([
                'people' => $request->peoples
            ]);
        }
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Bổ sung khách hàng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Thêm người thành công !',
            'data' => $values
        ];
    }

    public function processCheckIn($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if (
            $billing->status == 2 ||
            $billing->status == 4 ||
            $billing->status == 5 ||
            $billing->status == 6 ||
            $billing->status == 7
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể nhận phòng !',
                'data' => null
            ]);
        }
        $this->billing->where('_id', $request->billing_id)->update([
            'status' => 3
        ]);
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Nhận phòng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Nhận phòng thành công !',
            'data' => $values
        ];
    }

    public function processCheckOut($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status != 3) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể trả phòng !',
                'data' => null
            ]);
        }
        $this->billing->where('_id', '=', $request->billing_id)->update([
            'status' => 4
        ]);
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Khách trả phòng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Trả phòng thành công !',
            'data' => $values
        ];
    }

    public function cancelBooking($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status == 0 || $billing->status == 1) {
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'status' => 2
            ]);
            $values = [
                'booking_id' => $request->billing_id,
                'admin_id' => $request->user()->id,
                'handle' => 'Hủy đặt phòng',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
            $this->history_handle->create($values);
            return [
                'status' => 'success',
                'message' => 'Huỷ phòng thành công !',
                'data' => $values
            ];
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Không thể trả phòng !',
            'data' => null
        ]);
    }

    public function checkBooking($request){
        $billing_id = $request->billing_id;
        $billing = $this->billing->where('_id', '=', $billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Tìm thấy hóa đơn !',
            'data' => new BillingResource($billing)
        ]);
    }
}
