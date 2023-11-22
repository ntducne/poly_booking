<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\AdminBooking\SearchRequest;
use App\Http\Requests\Booking\AdminBooking\StoreRequest;
use App\Repositories\BookingRepository;
use App\Repositories\RoomRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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
    public function store(StoreRequest $request)
    {
        return $this->roomRepository->processBooking($request);
    }

    public function search(SearchRequest $request)
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
