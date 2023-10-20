<?php

namespace App\Repositories;

use App\Http\Resources\BillingResource;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Services;

class BookingRepository
{
    private Booking $booking;
    private BookDetail $booking_detail;
    private Room $room;
    private RoomType $room_type;
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

    public function cancel($id)
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update(['status' => true]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }

    public function orderList(){
        return BillingResource::collection($this->billing->paginate(10));
    }

    public function orderDetail($id){
        return new BillingResource($this->billing->find($id));
    }

    private function check_room($checkin, $checkout, $branch_id, $adults, $children, $room_type_id)
    {
        $room_book = $this->booking
            ->where('check_in', '<=', $checkin)
            ->where('check_out', '>=', $checkout)
            ->where('room_type', $room_type_id)
            ->where('branch', $branch_id)
            ->get();
        $room = $this->room
            ->where('adult', '>=', $adults)
            ->where('child', '>=', $children)
            ->where('room_type_id', $room_type_id)
            ->where('branch', $branch_id)
            ->get();
        $room_booked = [];
        foreach ($room_book as $item) {
            $room_booked[] = $this->booking_detail::find($item->id)->room_id;
        }
        $room_available = [];
        foreach ($room as $item) {
            if (!in_array($item->id, $room_booked)) {
                $room_available[] = $item->id;
            }
        }
        return $room_available;
    }

    public function renew_booking($request)
    {
        // Đọc thông tin từ request
        $name = $request->name;
        $email = $request->email;
        $phone = $request->phone;
        $check_in = $request->check_in;
        $check_out = $request->check_out;
        $room_type_id = $request->room_type_id;
        $branch_id = $request->branch_id;
        $adults = $request->adults;
        $children = $request->children;
        $amount_room = $request->amount_room;

        // Kiểm tra sự có sẵn của phòng
        $available_rooms = $this->check_room($check_in, $check_out, $branch_id, $adults, $children, $room_type_id);

        // Kiểm tra xem có đủ số phòng cần đặt không
        if (count($available_rooms) < $amount_room) {
            return response()->json(['error' => 'Không đủ phòng trống !'], 400);
        }

        // Lấy ra danh sách phòng cần đặt
        $selected_rooms = array_slice($available_rooms, 0, $amount_room);

        // Tạo một mảng chi tiết đặt phòng
        $details = [];
        foreach ($selected_rooms as $room_id) {
            $details[] = [
                'room_id' => $room_id,
                'room_name' => Room::find($room_id)->name,
            ];
        }

        // Tạo đối tượng booking
        $booking = [
            'user' => [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
            ],
            'booking_date' => date('Y-m-d'),
            'check_in' => $check_in,
            'check_out' => $check_out,
            'room_type' => $room_type_id,
            'adults' => $adults,
            'children' => $children,
            'branch' => $branch_id,
            'detail' => $details,
        ];
        Booking::create($booking);
        return response()->json([
            'message' => 'Đặt phòng thành công !',
        ]);
    }

    public function addServiceToBilling(){

    }

}
