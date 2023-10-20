<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Repositories\BookingRepository;
use Illuminate\Http\JsonResponse;

class BillingController extends Controller
{
    private Billing $billing;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRespository = $bookingRepository;
        $this->billing = new Billing();
    }

    public function index()
    {
        return $this->bookingRespository->orderList();
    }

    public function show($id)
    {
        return $this->bookingRespository->orderDetail($id);
    }



}
