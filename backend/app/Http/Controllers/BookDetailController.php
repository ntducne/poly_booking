<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use App\Models\BookDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redis;

class BookDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected BookDetail $bookdetail;
    public function __construct() {
        $this->bookdetail = new BookDetail();
    }
    public function index()
    {
        $cacheBookDetail = Redis::get('bookdetails');
        if ($cacheBookDetail !== null) {
            $bookDetails = json_decode($cacheBookDetail, true);
            $response = [
                'message' => 'Get Redis',
                'data' => $bookDetails 
            ];
        } else {
            $bookdetails = $this->bookdetail->paginate(5);
            Redis::set('bookdetails', json_encode($bookdetails));
            $response = [
                'message' => 'Get MongoDB',
                'data' => $bookdetails
            ];
        }
        return response()->json($response);
    }

    public function show($id)
    {
        $bookdetail = $this->bookdetail->find($id);
        if (!$bookdetail) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        } else {
            $cachedbookdetail = Redis::get('bookdetails_' . $id);
            if ($cachedbookdetail !== null) {
                $bookdetail = json_decode($cachedbookdetail, true);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết Booking !',
                'data' => [
                    'detail'=>$bookdetail ,
                    'booking'=> Booking::find($bookdetail->booking_id),
                    'room'=>Room::find($bookdetail->room_id)
                ]
            ]);
        }
    }
    public function destroy($id)
    {
        $bookings = BookDetail::find($id);
        if ($bookings) {
            $delete = $bookings->delete();
            if ($delete) {
                Redis::del('bookdetails_', $id);
                Redis::del('bookdetails');
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
