<?php

namespace App\Http\Controllers;

use App\Http\Requests\Booking\StoreRequest;
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
        $bookings = $this->booking->paginate(5);
        $response = [
            'message' => 'Get MongoDB',
            'data' => $bookings
        ];
        return response()->json($response);
    }
    public function store(StoreRequest $request)
    {
        if (Auth::user()) {
            $booking = new Booking();
            $soLuong = $request->soLuong;
            $room_id = $request->room_id; // id phong ma khach dat 
            $room = Room::find($request->room_id); //tra ve du lieu phong ma khach muon dat 
            //dat phong 
            $param = $request->except(['soLuong', 'room_id']);
            $create = $booking->create($param);
            if ($create) {
                $bookDetail = new BookDetail();
                //neu so luong la 1
                $bookDetail->create(
                    [
                        'booking_id' => $create->_id,
                        'room_id' => $room_id,
                        'room_type' => $room->room_type_name,
                        'room_name' => $room->room_name,
                        'price_per_night' => 100000
                    ]
                );
                $response = [
                    'status' => 'success',
                    'message' => 'Đặt thành công',
                    'data' => $create,
                ];
                if ($soLuong > 1) {
                    //them phong neu khach hang dat 2 phong tro nen 
                    $listroom = Room::where('room_type_id', '=', $room->room_type_id)->where('_id', '!=', $room_id)->get(); //danh sach phong lien quan den phong muon dat 
                    $count = 1;
                    foreach ($listroom as $item) {
                        $checkRoom = BookDetail::find($item->$room_id); //kiem tra phong co ai dat chua 
                        if ($count == $soLuong) {
                            return $response = [
                                'status' => 'success',
                                'message' => 'Đặt thành công',
                                'data' => $create,
                            ];
                        }
                        if ($checkRoom == null) {
                            $bookDetail->create(
                                [
                                    'booking_id' => $create->_id,
                                    'room_id' => $room_id,
                                    'room_type' => $item->room_type_id,
                                    'room_name' => $item->room_name,
                                    'price_per_night' => 100000
                                    //RoomType::find($item->room_type_id)->price_per_night
                                ]
                            );
                        } else {
                            $checkBookingRoom = Booking::find($checkRoom->booking_id); //phong co ben booking va dang hoat dong 
                            $checkTime = strtotime($checkBookingRoom->checkout) < strtotime($create->checkin) ? true : false; // thoi gian co hop ly hay khong
                            if ($checkTime) {
                                $bookDetail->create(
                                    [
                                        'booking_id' => $create->_id,
                                        'room_id' => $room_id,
                                        'room_type' => $item->room_type_id,
                                        'room_name' => $item->room_name,
                                        'price_per_night' => 100000
                                        //RoomType::find($item->room_type_id)->price_per_night

                                    ]
                                );
                            }
                        }
                        $count++;
                    }
                }
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
    public function update(Request $request, $id): JsonResponse|RedirectResponse
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update($request->all());
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }
}