<?php

namespace App\Modules\Orders\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\HistoryHandleBooking;
use App\Models\Services;
use App\Repositories\BookingRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    private Billing $billing;
    private HistoryHandleBooking $history;
    private BookingRepository $bookingRespository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRespository = $bookingRepository;
        $this->billing = new Billing();
        $this->history = new HistoryHandleBooking();
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
