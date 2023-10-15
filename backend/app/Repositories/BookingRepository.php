<?php

namespace App\Repositories;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Room;
use App\Models\RoomType;

class BookingRepository
{
    private Booking $booking;
    private BookDetail $booking_detail;
    private Room $room;
    private RoomType $room_type;

    public function __construct()
    {
        $this->booking = new Booking();
        $this->booking_detail = new BookDetail();
        $this->room = new Room();
        $this->room_type = new RoomType();
    }

    public function search($request)
    {
        $arrRoomId = []; //chua id cac phong
        $room = Room::all();
        foreach ($room as $item) {
            $arrRoomId[] = [$item->_id, ''];
        }
        $arrCheckinCheckout = [];
        //check in check out cung ton tai
        if ($request->has('checkin') && $request->has('checkout')) {
            foreach ($arrRoomId as $book => $value) {
                //check qua book detail room da co ai dat hay chua
                $bookDetail = BookDetail::where('room_id', '=', $value[0])->get();
                if ($bookDetail) {
                    foreach ($bookDetail as $item) {
                        //data cua booking tra ve cho tung book detail cua phong da dat
                        $booking = Booking::find($item->booking_id);
                        //kiem tra check in check out trong khoang thoi gian tu $booking->checkin den $booking->checkout neu co se xoa id room
                        if ($request->checkin >= $booking->checkin && $request->checkout <= $booking->checkout && $request->checkin != '' && $request->checkout != '') {
                            unset($arrRoomId[$book]);
                        } else {
                            $arrCheckinCheckout[] = [$booking->checkin, $booking->checkout];
                        }
                    }
                    if ($arrCheckinCheckout) {
                        //kiem tra check in check out trong khoang tu thoi gian tu checkin min den checkout max neu co se xoa room_id
                        if ($request->checkin > min($arrCheckinCheckout[0]) && $request->checkout < max($arrCheckinCheckout[1]) && $request->checkin != '' && $request->checkout != '') {
                            unset($arrRoomId[$book]);
                        } elseif ($request->checkin != '' && $request->checkout != '') {
                            $min = min($arrCheckinCheckout);
                            $max = max($arrCheckinCheckout);
                            $arrRoomId[$book][1] = 'Phòng có thể đặt ';
                        }
                        if ($request->checkin != '' || $request->checkout != '') {
                            foreach ($arrCheckinCheckout as $key => $value) {
                                if ($request->checkin > $value[0] && $request->checkin < $value[1]) {
                                    unset($arrRoomId[$book]);
                                } else {
                                    $min = min($arrCheckinCheckout);
                                    $max = max($arrCheckinCheckout);
                                    $arrRoomId[$book][1] = 'Phòng có thể đặt ';
                                }
                            }
                        }
                    }
                }
            }
        }
        //check so luong
        if ($request->has('soNguoi') && $request->soNguoi != 0) {
            foreach ($arrRoomId as $key => $value) {
                $room = Room::where('_id', '=', $value[0])->get();
                if ($room[0]->num_of_people != $request->soNguoi) {
                    unset($arrRoomId[$key]);
                }
            }
        }
        if ($request->has('branch_id') && $request->branch_id != '') {
            foreach ($arrRoomId as $key => $value) {
                $room = Room::where('_id', '=', $value[0])->get();
                if ($room[0]->branch_id != $request->branch_id) {
                    unset($arrRoomId[$key]);
                }
            }
        }
        if ($arrRoomId) {
            $arrFitRoom = [];
            foreach ($arrRoomId as $item) {
                $arrFitRoom[] = ['room' => Room::find($item[0]), 'status' => $item[1]];
            }
            $response = [
                'status' => 'Tìm thành công',
                'data' => $arrFitRoom
            ];
        } else {
            $response = [
                'status' => 'Không tìm thấy'
            ];
        }
        return response()->json($response);
    }

    public function create($request)
    {
        $booking = new Booking();
        $soLuong = $request->soLuong;
        $room_id = $request->room_id; // id phong ma khach dat
        $branch_id = $request->branch_id;
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->get(); //tra ve du lieu phong ma khach muon dat
        //dat phong
        $param = $request->except(['soLuong', 'room_id', 'branch_id']);
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
                    'room_name' => $room[0]->room_name,
                ]
            );
            $response = [
                'status' => 'success',
                'message' => 'Đặt thành công',
                'data' => $create,
            ];
            if ($soLuong > 1) {
                //danh sach phong lien quan den phong muon dat
                $listroom = Room::where('room_type_id', '=', $room[0]->room_type_id)->where('branch_id', '=', $branch_id)->where('_id', '!=', $room_id)->get();
                $count = 1;
                $arrRoom = []; // mang nay chua cac phong phu hop sau khi loc
                foreach ($listroom as $item1) {
                    //lay tat ca du lieu co cung room_id
                    $checkRoom = BookDetail::where('room_id', '=', $item1->_id)->get();
                    // dd($checkRoom);
                    if (empty($checkRoom)) { //kiem tra mang co rong hay ko
                        $arrRoom[] = $item1->_id;
                    } else {
                        $checkoutMax = 0;
                        $checkinMin = strtotime($request->checkin);
                        foreach ($checkRoom as $item) {
                            //lay ra check in check out cua phong theo book detail join booking
                            $checkBookingRoom = $booking->where('_id', '=', $item->booking_id)->where('status', '=', false)->get();
                            if ($checkoutMax < strtotime($checkBookingRoom[0]->checkout)) {
                                $checkoutMax = strtotime($checkBookingRoom[0]->checkout);
                            }
                            if ($checkinMin > strtotime($checkBookingRoom[0]->checkin)) {
                                $checkinMin = strtotime($checkBookingRoom[0]->checkin);
                            }
                        }
                        // dd([date('Y-m-d', $checkoutMax), date('Y-m-d', $checkinMin)]);
                        if (strtotime($create->checkout) < $checkinMin || $checkoutMax < strtotime($create->checkin)) { // kiem tra lich dat phong co
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
        return response()->json($response);
    }

    public function cancel($id)
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update(['status' => true]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }

    private function check_room($checkin, $checkout, $branch_id, $adults, $children)
    {
        $room_book = $this->booking
            ->where('check_in', '<=', $checkin)
            ->where('check_out', '>=', $checkout)
            ->where('branch', $branch_id)
            ->where('status', '0')
            ->get();
        $room = $this->room
            ->where('adult', '>=', $adults)
            ->where('child', '>=', $children)
            ->where('branch', $branch_id)
            ->get();
        $room_booked = [];
        foreach ($room_book as $item) {
            $room_booked[] = BookDetail::find($item->id)->room_id;
        }
        $room_available = [];
        foreach ($room as $item) {
            if (!in_array($item->id, $room_booked)) {
                $room_available[] = $item->id;
            }
        }
        return $room_available;
    }

    public function book($request)
    {
        // thong tin khach hang
        $name = $request->name;
        $email = $request->email;
        $phone = $request->phone;

        // thong tin dat phong
        $check_in = $request->check_in;
        $check_out = $request->check_out;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        $adults = $request->adults;
        $children = $request->children;
        $room_type = $request->room_type;
        $branch = $request->branch;
        $amount_room = $request->amount_room;

        $bookings = [
            'user' => [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ],
            'booking_date' => date('Y-m-d'),
            'check_in' => $check_in,
            'check_out' => $check_out,
            'room_type' => $room_type,
            'adults' => $adults,
            'children' => $children,
            'branch' => $request->branch,
            'detail' => [

            ]
        ];
    }



}
