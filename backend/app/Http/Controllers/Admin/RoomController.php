<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\RoomImage;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
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

    public function index(Request $request): JsonResponse|AnonymousResourceCollection
    {
        try {
            $query = $this->room->newQuery();
            if ($request->has('name')) {
                $searchTerm = $request->input('name');
                $query->where('name', 'LIKE', '%' . $searchTerm . '%');
            }
            $rooms = $query->paginate(10)->withQueryString();
            return RoomResource::collection($rooms);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không lấy được dữ liệu !'
            ], 500);
        }

    }
    public function store(StoreRoomRequest $request)
    {
        try {
            $object = $request->all();
            $object['adults'] = (int) $object['adults'];
            $object['children'] = (int) $object['children'];
            $object['slug'] = convertToSlug($request->name);
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
                'message' => 'Lỗi thêm phòng !'
            ], 500);
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
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết phòng !',
                'data' => new RoomResource($room)
            ], 200);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $object = $this->room->find($id);
            if(!$object){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Phòng không tồn tại !',
                    'data' => null
                ], 404);
            }
            if($request->name != $object->name){
                $object->slug = convertToSlug($request->name);
            }

            $arr = $request->all();
            $room = $object->update($arr);
            return response()->json([
                'status' => 'success',
                'message' => 'Update phòng thành công!',
            ], 200);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }

    public function updateImage(Request $request, $id){
        try {
            $object = $this->room->find($id);
            if(!$object){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Phòng không tồn tại !',
                    'data' => null
                ], 404);
            }
            $images = $request->file('images');
//            dd($images);
            $arrayImg = [];
            if($images){
                $uploadFileUrl = $this->UploadMultiImage($images, 'rooms/'.$object->id.'/');
                $arrayImg[] = $uploadFileUrl;
                foreach($uploadFileUrl as $key => $image){
                    $this->room_image->create([
                        'room_id' => $object->id,
                        'image' => $image,
                        'serial' => $key+1,
                    ]);
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Update anh thành công!',
                'data' => $arrayImg,
            ], 200);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
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
                ], 404);
            }
            $room->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá phòng thành công !',
                'data' => $room
            ], 200);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }
    public function deleteImageRoom(Request $request) {
        $image = $this->room_image->where('image', $request->filePath)->where('room_id', $request->room_id)->first();
        if($image){
            $image->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá ảnh thành công !',
                'data' => $image
            ], 200);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Ảnh không tồn tại !',
                'data' => null
            ], 404);
        }
    }
}
