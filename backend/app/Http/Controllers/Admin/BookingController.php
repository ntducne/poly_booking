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
        return $this->bookingRepository->search($request);
    }

//    public function renew($id){
//        return $this->bookingRepository->cancel($id);
//    }
//
//    public function end(){
//        return $this->bookingRepository->end();
//    }
}
