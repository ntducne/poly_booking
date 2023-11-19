<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\AdminBooking\SearchRequest;
use App\Http\Requests\Booking\AdminBooking\StoreRequest;
use App\Repositories\BookingRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    private BookingRepository $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }
    public function store(StoreRequest $request)
    {
        $booking = $this->bookingRepository->book($request);
        if ($booking) {
            return response()->json(
                $booking->original
            );
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Hết phòng !',
        ]);
    }

    public function search(SearchRequest $request)
    {
        $search = $this->bookingRepository->search($request);
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
        // try {

            return $this->bookingRepository->giaHan($request);
            
        // } catch (Exception $exception) {
        //     Log::debug($exception->getMessage());
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Lỗi không thực hiện được gia hạn phòng !'
        //     ]);
        // }
    }

    //    public function renew($id){
//        return $this->bookingRepository->cancel($id);
//    }
//
//    public function end(){
//        return $this->bookingRepository->end();
//    }
}
