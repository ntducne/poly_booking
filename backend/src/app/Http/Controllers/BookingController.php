<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookDetail;

use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redis;
use Auth;

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
        $cacheBooking = Redis::get('bookings');
        if ($cacheBooking !== null) {
            $bookings = json_decode($cacheBooking, true);
            $response = [
                'message' => 'Get Redis',
                'data' => $bookings
            ];
        } else {
            $bookings = $this->booking->paginate(5);
            Redis::set('bookings', json_encode($bookings));
            $response = [
                'message' => 'Get MongoDB',
                'data' => $bookings
            ];
        }
        return response()->json($response);
    }
    public function store(Request $request)
    {
        if (Auth::user()) {
            $booking = new Booking();
            $soLuong = $request->soLuong;
            $room_id = $request->room_id;
            $room = Room::find($request->room_id);
            //dat phong 
            $param = $request->except(['soLuong', 'room_id']);
            $create = $booking->create($param);
            Redis::del('booking');
            if ($create) {
                //tra ve so phong vua dat 
                $bookDetail = new BookDetail();
                for ($i = 0; $i < $soLuong; $i++) {
                    $bookDetail->create(
                        [
                            'booking_id' => $create->_id,
                            'room_id' => $room_id,
                            'room_type' => RoomType::find($room->room_type_id)->room_type_name,
                            'room_name' => $room->room_name,
                            'price_per_night' => RoomType::find($room->room_type_id)->price_per_night
                        ]
                    );
                }
                $response = [
                    'status' => 'success',
                    'message' => 'Đặt thành công',
                    'data' => $create,
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Ban can dang nhap de thuc hien dat phong'
            ];
        }
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
            $cachedbookings = Redis::get('bookings_' . $id);
            if ($cachedbookings !== null) {
                $bookings = json_decode($cachedbookings, true);
            }
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
                Redis::del('bookings_', $id);
                Redis::del('bookings');
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
    public function update(Request $request, $id): JsonResponse|RedirectResponse
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update($request->all());
        if ($update) {
            Redis::del('bookings_', $id);
            Redis::del('bookings');
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }
}