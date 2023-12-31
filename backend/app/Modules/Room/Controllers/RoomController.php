<?php

namespace App\Modules\Room\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Modules\Room\Requests\StoreRoomRequest;
use App\Modules\Room\Requests\UpdateRoomRequest;
use App\Modules\Room\Resources\RoomResource;
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
            $query->where('branch_id', $request->user()->branch_id);
            if ($request->has('name')) {
                $searchTerm = $request->input('name');
                $query->where('name', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('room_type_id')) {
                $searchTerm = $request->input('room_type_id');
                $query->where('room_type_id', $searchTerm);
            }
            $rooms = $query->paginate(10);
            return RoomResource::collection($rooms);
        } catch (Exception $exception) {
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
            $object['amount_room'] = (int)$object['amount'];
            $object['branch_id'] = RoomType::find($request->room_type_id)->branch_id;
            $object['num_of_bed'] = json_decode(stripslashes($request->num_of_bed), true);
            $room_number = [];
            for ($i = 1; $i <= $object['amount_room']; $i++) {
                if ($i < 10) {
                    $i = '0' . $i;
                }
                $room_number[] = $object['floor'] . $i;
            }
            $object['room_number'] = $room_number;
            $roomNew = $this->room->create($object);
            $room = $this->room->where('name', $request->name)->first();
            $images = $request->file('images');
            if ($images) {
                $uploadFileUrl = $this->UploadMultiImage($images, 'rooms/' . $room->id . '/');
                foreach ($uploadFileUrl as $key => $image) {
                    $this->room_image->create([
                        'room_id' => $room->id,
                        'image' => $image,
                        'serial' => $key + 1,
                    ]);
                }
                $response = [
                    'status' => 'success',
                    'message' => 'Thêm phòng thành công ! ',
                    'data'    => $roomNew
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Thêm phòng không thành công ! ',
                    'data'    => null
                ];
            }
            return response()->json($response);
        } catch (Exception $exception) {
            throw $exception;
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi thêm phòng !'
            ], 500);
        }
    }
    public function show(Request $request, $id)
    {
        try {
            $room = $this->room->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
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
                'data' => new RoomResource($room),
            ], 200);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }
    public function update(UpdateRoomRequest $request, $id)
    {
        try {
            $object = $this->room->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$object) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Phòng không tồn tại !',
                    'data' => null
                ], 404);
            }
            if ($request->name != $object->name) {
                $object->slug = convertToSlug($request->name);
            }
            $arr = $request->all();
            $arr['num_of_bed'] = $request->num_of_bed;
            $object->update($arr);
            return response()->json([
                'status' => 'success',
                'message' => 'Update phòng thành công!',
            ], 200);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }

    public function updateImage(Request $request, $id)
    {
        try {
            $object = $this->room->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$object) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Phòng không tồn tại !',
                    'data' => null
                ], 404);
            }
            $images = $request->file('images');
            //            dd($images);
            $arrayImg = [];
            if ($images) {
                $uploadFileUrl = $this->UploadMultiImage($images, 'rooms/' . $object->id . '/');
                $arrayImg[] = $uploadFileUrl;
                foreach ($uploadFileUrl as $key => $image) {
                    $this->room_image->create([
                        'room_id' => $object->id,
                        'image' => $image,
                        'serial' => $key + 1,
                    ]);
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Update anh thành công!',
                'data' => $arrayImg,
            ], 200);
        } catch (Exception $exception) {
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
            $room = $this->room->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$room) {
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
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ], 500);
        }
    }
    public function deleteImageRoom(Request $request)
    {

        $room_image = $this->room_image->where('room_id', $request->room_id)->get();
        if(count($room_image) == 1){
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng phải có ít nhất 1 ảnh !',
                'data' => null
            ], 404);
        }

        $image = $this->room_image->where('image', $request->filePath)->where('room_id', $request->room_id)->first();
        if ($image) {
            $image->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá ảnh thành công !',
                'data' => $image
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Ảnh không tồn tại !',
                'data' => null
            ], 404);
        }
    }
}
