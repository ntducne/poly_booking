<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreRequest;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookDetail;
use App\Models\Room;
use App\Models\RoomType;
use DB;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redis;

class BookingController extends Controller
{
    public function datPhong(StoreRequest $request)
    {
        if (Auth::user()) {
            $booking = new Booking();
            $soLuong = $request->soLuong;
            $room_id = $request->room_id; // id phong ma khach dat 
            $room = Room::find($request->room_id); //tra ve du lieu phong ma khach muon dat 
            //dat phong 
            $param = $request->except(['soLuong', 'room_id']);
            // $price_per_night = RoomType::find($room->room_type_id)->price_per_night;
            $price_per_night = 100000;
            $param['price_per_night'] = ($price_per_night == null ? 100000 : $price_per_night);
            $create = $booking->create($param);
            if ($create) {
                $bookDetail = new BookDetail();
                //neu so luong la 1
                $bookDetail->create(
                    [
                        'booking_id' => $create->_id,
                        'room_id' => $room_id,
                        'room_name' => $room->room_name,
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
                    // dd($listroom);
                    $count = 1;
                    $arrRoom = array(); // mang nay chua caac phong trong trong thoi gian checkin check out 
                    foreach ($listroom as $item1) {
                        $checkRoom = BookDetail::where('room_id', '=', $item1->_id)->get(); //lay tat ca du lieu co cung room_id
                        if (empty($checkRoom)) { //kiem tra mang co rong hay ko 
                            $arrRoom[] = $item1->_id;
                        } else {
                            $chechoutMax = 0;
                            foreach ($checkRoom as $item) {
                                $checkBookingRoom = Booking::where('_id','=',$item->booking_id)->where('status','=',false)->get(); //lay ra du lieu bang booking cua cac room_id ben bang book detail
                                if ($chechoutMax < strtotime($checkBookingRoom[0]->checkout)) {
                                    $chechoutMax = strtotime($checkBookingRoom[0]->checkout); //so sanh thoi gian cac lich dat phong 
                                }
                            }
                            if ($chechoutMax < strtotime($create->checkin)) { // kiem tra lich dat phong co 
                                $arrRoom[] = $item1->_id;
                            }
                        }
                    }
                    foreach ($arrRoom as $key => $value) {
                        if ($count == $soLuong) {
                            return $response = [
                                'status' => 'success',
                                'message' => 'Đặt thành công',
                                'data' => $create,
                            ];
                        }
                        $bookDetail->create(
                            [
                                'booking_id' => $create->_id,
                                'room_id' => $value,
                                'room_name' => Room::find($value)->room_name,
                            ]
                        );
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
    public function timKiem(Request $request)
    {
        $query = new Booking();
        if ($request->has('checkin') && $request->checkin != '' && $request->has('checkout') && $request->checkout != '') {
            $checkin = $request->checkin;
            $checkout = $request->checkout;
            $query = $query->where(function ($query) use ($checkin, $checkout) {
                $query = $query->whereBetween('checkin', [$checkin, $checkout])
                    ->orWhere(function ($query) use ($checkin, $checkout) {
                        $query->whereBetween('checkout', [$checkin, $checkout])
                            ->orWhere(function ($query) use ($checkin, $checkout) {
                                $query = $query->whereNotBetween('checkin', [$checkin, $checkout])
                                    ->orWhere(function ($query) use ($checkin, $checkout) {
                                        $query->whereNotBetween('checkout', [$checkin, $checkout]);
                                    });
                            });
                    });
            });
        } else {
            if ($request->has('checkin') && $request->checkin != '') {
                $checkin = $request->checkin;
                $query = $query->where(function ($query) use ($checkin) {
                    $query->where('checkout', '<', $checkin)->orWhere('checkin', '>', $checkin);
                });
            }
            if ($request->has('checkout') && $request->checkout != '') {
                $checkout = $request->checkout;
                $query = $query->where(function ($query) use ($checkout) {
                    $query->where('checkin', '>', $checkout)->orWhere('checkout', '<', $checkout);
                });
            }
        }
        $arrFit = $query->get(); //Lọc booking để lấy ra các booking phù hợp với khách hàng check in check out 
        $arrRoom = []; //chứa id các phòng thỏa mãn 
        if ($arrFit) {
            foreach ($arrFit as $item1) {
                $bookDetail = BookDetail::where('booking_id', '=', $item1->_id)->get();
                foreach ($bookDetail as $item2) {
                    $room = Room::where('_id', '=', $item2->room_id);
                    if ($request->has('soNguoi') && $request->soNguoi != 0) {
                        $room->where('num_of_people', '=', $request->soNguoi);
                    }
                    $room = $room->get();
                    if (!empty($room[0])) {
                        $arrRoom[] = $room[0]->_id;
                    } else {
                        $response = [
                            'message' => 'Không tìm thấy phòng như vậy'
                        ];
                    }
                }
            }
        }
        if (!empty($arrRoom)) {
            $arrUnique = array_unique($arrRoom);//Loại bỏ các phòng trùng nhau 
            $arrNew = [];
            if ($request->has('soPhong') && $request->soPhong != 0) {
                $ramdomarr = array_rand($arrUnique, 2); // Mảng chứa 2 phần tử ramdom
                foreach ($ramdomarr as $key => $value) {
                    $arrNew[] = $arrUnique[$value];
                }
            } else {
                $arrNew = $arrUnique;
            }
            $arrFitRoom = [];
            foreach ($arrNew as $item) {
                $arrFitRoom[] = Room::find($item); // duyệt lấy ra thông tin các phòng phù hợp sau khi tìm thành công 
            }
            $response = [
                'status' => 'Tìm thành công',
                'data' => $arrFitRoom
            ];
        }
        return response()->json($response);
    }
    public function huyPhong(Request $request, $id)
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update(['status'=>true]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }
}