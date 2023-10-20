<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    private Billing $billing;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRespository = $bookingRepository;
        $this->billing = new Billing();
        $this->history = new HistoryHandleBooking();
    }

    public function index(): JsonResponse
    {
        $data = $this->billing->all();
        return response()->json($data);
    }

    public function show($id): JsonResponse
    {
        $data = $this->billing->find($id);
        return response()->json($data->bookingInBilling());
    }

    public function store($id): JsonResponse
    {
        $data = $this->billing->create([
            'booking_id' => $id,
            'status' => 'pending'
        ]);
        return response()->json($data);
    }

    public function update($id): JsonResponse
    {
        $data = $this->billing->find($id);
        $data->update([
            'status' => 'paid'
        ]);
        return response()->json($data);
    }

    public function destroy($id): JsonResponse
    {
        $data = $this->billing->find($id);
        $data->delete();
        return response()->json($data);
    }

    public function destroyAll(): JsonResponse
    {
        $data = $this->billing->truncate();
        return response()->json($data);
    }



}
