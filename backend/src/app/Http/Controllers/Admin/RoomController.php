<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Models\Room;
use App\Models\RoomImage;

class RoomController extends Controller
{
    private Room $room;
    private RoomImage $room_image;

    public function __construct()
    {
        $this->room = new Room();
        $this->room_image = new RoomImage();
    }

    public function index()
    {
        $rooms = $this->room->paginate(6);
        return response()->json([
            'message'   => 'Get Data',
            'data'      => $rooms,
        ]);
    }
    public function store(StoreRoomRequest $request)
    {
        $object = $request->all();
//        dd($object);
        $roomNew = $this->room->create($object);
//        dd($roomNew);
        $room = $this->room->where('name', $request->name)->first();
//        dd($room);
        $images = $request->file('images');
//        dd($images);
        if($images){
            $uploadFileUrl = $this->UploadMultiImage($images, 'rooms/'.$room->id.'/');
            foreach($uploadFileUrl as $key => $image){
                $this->room_image->create([
                   'room_id' => $room->id,
                   'image' => $image,
                    'serial' => $key+1,
                ]);
            }
            $response = [
                'status' => 'success',
                'message' => 'Thêm phòng thành công ! ',
                'data'    => $roomNew
            ];
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Thêm phòng không thành công ! ',
                'data'    => null
            ];
        }
        return response()->json($response);
    }
    public function show( $id)
    {
        $room = $this->room->find($id);
        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
                'data' => null
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết phòng !',
            'data' => $room
        ]);
    }

    public function update(UpdateRoomRequest $request, $id)
    {
        $object = $this->room->find($id);
        if(!$object){
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
                'data' => null
            ]);
        }
        $roomImages = $this->room_image->where('rooom_id', $object->id)->get();
        foreach ($roomImages as $item){
            $image = $request->file($item->id);
            if($image){
                $this->DeleteImage($item->image);
                $uploadedFileUrl = $this->UploadImage($image, 'rooms/'.$object->id.'/');
                $item->update([
                   'image' => $uploadedFileUrl,
                ]);
            }
        }

        $arr = $request->all();
        $room = $object->update($arr);
        return response()->json([
            'status' => 'success',
            'message' => 'Update phòng thành công!',
            'data' => $room,
        ]);

    }
    public function destroy($id)
    {
        $room = Room::find($id);
        if(!$room){
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
                'data' => null
            ]);
        }
        $room->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá phòng thành công !',
            'data' => $room
        ]);
    }
}
