<?php

namespace App\Repositories;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;

class RoomRepository
{
    private Room $room;
    private RoomImage $room_image;
    private Booking $booking;
    private BookDetail $bookDetail;

    public function __construct()
    {
        $this->room = new Room();
        $this->room_type = new RoomType();
        $this->room_image = new RoomImage();

        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();

        $this->billing = new Billing();
    }

    public function list()
    {
        return $this->room->paginate(6);
    }

    public function show($id)
    {
        return $this->room->find($id);
    }

    public function create($request)
    {
        $object = $request->all();
        $roomNew = $this->room->create($object);
        $room = $this->room->where('name', $request->name)->first();
        $images = $request->file('image_room');
        if ($images) {
            $uploadFileUrl = UploadMultiImage($images, 'rooms/' . $room->id . '/');
            foreach ($uploadFileUrl as $key => $image) {
                $this->room_image->create([
                    'room_id' => $room->id,
                    'image' => $image,
                    'serial' => $key + 1,
                ]);
            }
            return $roomNew;
        } else {
            return false;
        }
    }

    public function update($request, $id)
    {
        $object = $this->room->find($id);
        if (!$object) {
            return false;
        }
        $roomImages = $this->room_image->where('room_id', $object->id)->get();
        foreach ($roomImages as $item) {
            $image = $request->file($item->id);
            if ($image) {
                DeleteImage($item->image);
                $uploadedFileUrl = UploadImage($image, 'rooms/' . $object->id . '/');
                $item->update([
                    'image' => $uploadedFileUrl,
                ]);
            }
        }
        $arr = $request->all();
        return $object->update($arr);
    }

    public function delete($id)
    {
        $room = $this->room->find($id);
        if (!$room) {
            return false;
        }
        $room->delete();
        return true;
    }

    public function processSearchRoom($request){
        $adult = $request->adult;
        $children = $request->children;
        $checkin = $request->checkin;
        $checkout = $request->checkout;
        $branch_id = $request->branch_id;
        $amount_room = $request->amount_room;

        // điều kiện 1: check in phải lớn hơn ngày hiện tại
        if( $checkin < date('Y-m-d')){
            return response()->json([
                'message' => 'Ngày check in phải lớn hơn ngày hiện tại',
                'status' => false
            ]);
        }

        // điều kiện 2: check out phải lớn hơn check in
        if( $checkout < $checkin){
            return response()->json([
                'message' => 'Ngày check out phải lớn hơn ngày check in',
                'status' => false
            ]);
        }

        // điều kiện 3: số người lớn và trẻ em phải lớn hơn 0
        if( $adult < 1 || $children < 1){
            return response()->json([
                'message' => 'Số người lớn và trẻ em phải lớn hơn 0',
                'status' => false
            ]);
        }

        // điều kiện 4: số phòng không thể nhiều hơn số người lớn
        if( $amount_room > $adult){
            return response()->json([
                'message' => 'Số phòng không thể nhiều hơn số người lớn',
                'status' => false
            ]);
        }

        // điều kiện 5:

        // 5.0: đếm phòng của từng loại phòng, nếu số lượng phòng yêu cầu lớn hơn số lượng phòng của loại phòng đó thì return về không đủ phòng
        $room_type = $this->room_type->where('branch_id', $branch_id)->get();
        $room_count = $this->room->whereIn('room_type_id', $room_type->pluck('id'))->groupBy('room_type_id')->map(function ($item, $key) {
            return count($item);
        });
        foreach($room_type as $item){
            if($amount_room > $room_count[$item->id]){
                return response()->json([
                    'message' => 'Không đủ phòng',
                    'status' => false
                ]);
            }
        }

        // 5.1: lấy toàn bộ loại phòng của chi nhánh
        $room_type = $this->room_type->where('branch_id', $branch_id)->get();
        // đếm phòng vs từng loại phòng
        $room_count = $this->room->whereIn('room_type_id', $room_type->pluck('id'))->groupBy('room_type_id')->map(function ($item, $key) {
            return count($item);
        });
        // 5.2: lấy toàn bộ phòng của chi nhánh đó theo loại phòng và có adult >= số người lớn yêu cầu và children >= số trẻ em yêu cầu
//        $room = $this->room->whereIn('room_type_id', $room_type->pluck('id'))->where('adults', '>=', $adult)->where('children', '>=', $children)->get();
//        if(count($room) == 0){
//            return response()->json([
//                'message' => 'Không có phòng nào phù hợp',
//                'status' => false
//            ]);
//        }
        // 5.3: lấy toàn bộ billing có status ( 2, 4, 6, 7 ) của chi nhánh đó
        $billing = $this->billing->whereIn('status', [2, 4, 6, 7])->where('branch_id', $branch_id)->get();

        // 5.4: lấy toàn bộ booking có room type và billing ở trên
        $booking = $this->booking->whereIn('room_type', $room_type->pluck('id'))->whereIn('billing_id', $billing->pluck('id'))->get();

        // 5.5: lấy toàn bộ book detail từ booking ở trên
        $bookDetail = $this->bookDetail->whereIn('booking_id', $booking->pluck('id'))->get();

        // 5.6 đếm tổng số lượng phòng đã đặt của room type đó ( đếm theo room_id trong book detail )
        $roomBooked = $bookDetail->groupBy('room_id')->map(function ($item, $key) {
            return count($item);
        });








    }
}


