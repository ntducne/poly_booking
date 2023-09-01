<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request;
use app\Http\Requests\Room\StoreRoomRequest;
use app\Http\Requests\Room\UpdateRoomRequest;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class RoomController extends Controller
{
    private Room $room;


    public function __construct()
    {
        $this->room = new Room();
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
        $images = $request->file('images');
        if($images){
            $uploadFileUrl = $this->UploadMultiImage($images, 'rooms');
            $object['images'] = $uploadFileUrl;
            $room = new Room($object);
            $room->save();
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
