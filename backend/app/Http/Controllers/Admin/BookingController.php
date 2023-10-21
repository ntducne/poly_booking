<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BookingRepository;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }
    public function store(Request $request){
        return $this->bookingRepository->book($request);
    }

    public function search(Request $request){
        $search = $this->bookingRepository->search($request);
        if($search){
            return response()->json([
                'status' => 'success',
                'message' => 'Tìm kiếm thành công !',
                'data' => $search
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Không tìm thấy !',
            'data' => null
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
