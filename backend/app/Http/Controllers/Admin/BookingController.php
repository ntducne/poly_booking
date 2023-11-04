<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\AdminBooking\SearchRequest;
use App\Http\Requests\Booking\AdminBooking\StoreRequest;
use App\Repositories\BookingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }
    public function store(StoreRequest $request)
    {
        $booking = $this->bookingRepository->book($request);
        if ($booking) {
            return response()->json([
                'status' => 'success',
                'message' => 'Đặt phòng thành công !',
            ]);
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

    //    public function renew($id){
//        return $this->bookingRepository->cancel($id);
//    }
//
//    public function end(){
//        return $this->bookingRepository->end();
//    }
}
