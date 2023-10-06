<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected Booking $booking;
    public function __construct()
    {
        $this->booking = new Booking();
    }
    public function index(): JsonResponse
    {
        $bookings = $this->booking->paginate(5);
        $response = [
            'message' => 'Get MongoDB',
            'data' => $bookings
        ];
        return response()->json($response);
    }
    public function show($id)
    {
        $bookings = $this->booking->find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết Booking !',
                'data' => $bookings
            ]);
        }
    }
    public function destroy($id)
    {
        $bookings = Booking::find($id);
        if ($bookings) {
            $delete = $bookings->delete();
            if ($delete) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Xóa thành công !',
                    'data' => $bookings
                ]);
            }
        } else {
            return response()->json(
                [
                    'status' => 'error !',
                    'message' => 'Booking không tồn tại !',
                    'data' => null
                ]
            );
        }
    }
}