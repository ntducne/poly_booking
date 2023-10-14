<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomType\StoreRoomTypeRequest;
use App\Http\Requests\RoomType\UpdateRoomTypeRequest;
use App\Models\RoomType;
use Exception;
use Illuminate\Support\Facades\Log;

class RoomTypeController extends Controller
{
    private RoomType $roomType;

    public function __construct()
    {
        $this->roomType = new RoomType();
    }
    public function index()
    {
        try {
            $roomTypes = $this->roomType->paginate(6);
            $respose = [
                'message'   => 'Get Data' ,
                'data'      => $roomTypes
            ];
            return response()->json($respose);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function store(StoreRoomTypeRequest $request)
    {
        try {
            $object = $request->all();
//        dd($object);
            $roomtype = new RoomType($object);
            $roomtype->save();
            return response()->json([
                'status'   => 'success',
                'message'  => 'Thêm loại phòng thành công !',
                'data'     => $roomtype
            ]);
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
            $roomType = $this->roomType->find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                    'data' => null
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết loại phòng !',
                'data' => $roomType
            ]);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function update(UpdateRoomTypeRequest $request,  $id)
    {
        try {
            $roomType = RoomType::find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                    'data' => null
                ]);
            }
            $roomType->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật loại phòng thành công !',
                'data' => $roomType
            ]);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function destroy( $id)
    {
        try {
            $roomType = RoomType::find($id);
            if (!$roomType) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Loại phòng không tồn tại !',
                    'data' => null
                ]);
            }
            $roomType->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá loại phòng thành công !',
                'data' => $roomType
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
