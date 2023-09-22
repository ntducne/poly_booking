<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
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
    public function store(Request $request)
    {
        $object = $request->all();
        $this->room->create($object);

        $room = $this->room->where('room_name', $request->room_name)->first();
        $images = $request->file('images');
        if($images){
            $uploadFileUrl = $this->UploadMultiImage($images, 'rooms'.$room->id.'/');
            foreach($uploadFileUrl as $key => $image){
                $this->room_image->create([
                   'room_id' => $room->id,
                   'image' => $image,
                ]);
            }
//            $object['images'] = $uploadFileUrl;
//            $room = new Room($object);
//            $room->save();
            $response = [
                'status' => 'success',
                'message' => 'Thêm phòng thành công ! ',
                'data'    => $room
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

    public function update(Request $request, $id)
    {

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
