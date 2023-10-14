<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\RoomImage;
use Exception;
use Illuminate\Support\Facades\Log;

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
        try {
            return RoomResource::collection(Room::paginate(10));
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function store(StoreRoomRequest $request)
    {
        try {
            $object = $request->all();
            $roomNew = $this->room->create($object);
            $room = $this->room->where('name', $request->name)->first();
            $images = $request->file('images');
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function show( $id)
    {
        try {
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function update(UpdateRoomRequest $request, $id)
    {
        try {
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function destroy($id)
    {
        try {
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
}
