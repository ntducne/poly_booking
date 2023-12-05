<?php

namespace App\Modules\RoomType\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\RoomType\Requests\StoreRoomTypeRequest;
use App\Modules\RoomType\Requests\UpdateRoomTypeRequest;
use App\Models\RoomType;
use App\Modules\RoomType\Resources\RoomTypeResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoomTypeController extends Controller
{
    private RoomType $roomType;

    public function __construct()
    {
        $this->roomType = new RoomType();
    }

    public function index(Request $request): JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        try {
            $roomTypes = $this->roomType->orderBy('id', 'desc');
            if($request->page){
                if($request->page == 'all') {
                    $roomTypes = $roomTypes->get();
                }
                else {
                    $roomTypes = $roomTypes->paginate(10);
                }
            }
            else {
                $roomTypes = $roomTypes->paginate(10);
            }
            return RoomTypeResource::collection($roomTypes);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi lấy danh sách loại phòng !'
            ], 500);
        }

    }

    public function store(StoreRoomTypeRequest $request)
    {
        try {
            $object = $request->all();
            $roomtype = new RoomType($object);
            $roomtype->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm loại phòng thành công !',
                'data' => new RoomTypeResource($roomtype)
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi thêm loại phòng !'
            ], 500);
        }

    }

    public function show($id)
    {
        try {
            $roomType = $this->roomType->find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết loại phòng !',
                'data' => new RoomTypeResource($roomType)
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi lấy chi tiết loại phòng !'
            ], 500);
        }

    }

    public function update(UpdateRoomTypeRequest $request, $id): JsonResponse
    {
        try {
            $roomType = RoomType::find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                ], 404);
            }
            $roomType->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật loại phòng thành công !',
                'data' => new RoomTypeResource($roomType)
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi cập nhật loại phòng !'
            ], 500);
        }

    }

    public function destroy($id): JsonResponse
    {
        try {
            $roomType = RoomType::find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                ], 404);
            }
            $roomType->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá loại phòng thành công !',
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi !'
            ], 500);
        }

    }
}
