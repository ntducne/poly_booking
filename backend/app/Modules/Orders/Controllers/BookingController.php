<?php

namespace App\Modules\Orders\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\BookingRepository;
use App\Repositories\RoomRepository;
use Exception;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    private BookingRepository $bookingRepository;
    private RoomRepository $roomRepository;

    public function __construct(
        BookingRepository $bookingRepository,
        RoomRepository $roomRepository
    )
    {
        $this->bookingRepository = $bookingRepository;
        $this->roomRepository = $roomRepository;
    }

    public function store(Request $request)
    {
        try {
            $booking = $this->roomRepository->processBooking($request);
            if ($booking) {
                return $booking;
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Tiếc quá, phòng đã được đặt !'
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đặt phòng thất bại !',
            ]);
        }
    }

    public function search(Request $request)
    {
        $search = $this->roomRepository->processSearchRoom($request);
        if ($search) {
            return response()->json([
                'status' => 'success',
                'message' => 'Tìm phòng thành công !',
                'data' => $search
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Không tìm thấy !',
        ]);
    }

    public function cancel(Request $request)
    {
        $cancel = $this->bookingRepository->cancelBooking($request);
        if ($cancel) {
            return $cancel;
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Hủy đặt phòng thất bại !',
        ]);
    }

    public function checkin(Request $request)
    {
        $checkin = $this->bookingRepository->processCheckIn($request);
        if ($checkin) {
            return $checkin;
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Nhận phòng thất bại !',
        ]);
    }

    public function checkout(Request $request)
    {
        $end = $this->bookingRepository->processCheckOut($request);
        if ($end) {
            return $end;
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Trả phòng thất bại !',
        ]);
    }

    public function addPeople(Request $request)
    {
        $add = $this->bookingRepository->addPeople($request);
        if ($add) {
            return $add;
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Thêm người thất bại !',
        ]);
    }

    public function addService(Request $request)
    {
        $add = $this->bookingRepository->addService($request);
        if ($add) {
            return $add;
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Thêm người thất bại !',
        ]);
    }

    public function giaHan(Request $request) {
        try {
            return $this->roomRepository->processRenew($request);
        } catch (Exception $exception) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được gia hạn phòng !'
            ]);
        }
    }
}
