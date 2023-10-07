<?php

namespace App\Repositories;

use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Room;
use App\Models\RoomImage;

class RoomRepository
{
    private Room $room;
    private RoomImage $room_image;
    private Booking $booking;
    private BookDetail $bookDetail;

    public function __construct()
    {
        $this->room = new Room();
        $this->room_image = new RoomImage();

        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();
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

    public function search($request)
    {
        $check_in = $request->check_in; // ngày đặt phòng
        $check_out = $request->check_out; // ngày trả phòng
        $adults = $request->adults; // người lớn
        $children = $request->children; // trẻ em
        $number_of_rooms = $request->number_of_rooms; // số lượng phòng

        // lấy các phòng có số người lớn và trẻ em lớn hơn hoặc bằng số người lớn và trẻ em trong request
        $rooms = $this->room
            ->where('adults', '>=', $adults)
            ->where('children', '>=', $children)
            ->get();

        // lấy các phòng từ bookDetail join với booking có trạng thái false
        $bookDetails = $this->bookDetail
            ->join('bookings', 'book_details.booking_id', '=', 'bookings.id')
            ->where('bookings.status', '=', false)
            ->get();

        // so sánh room vs bookDetail để lấy ra các phòng còn trống trong khoảng thời gian đặt phòng và trả phòng cùng với số người lớn và trẻ em
         




    }
}


