<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomType\StoreRoomTypeRequest;
use App\Http\Requests\RoomType\UpdateRoomTypeRequest;
use App\Models\RoomType;

class RoomTypeController extends Controller
{
    private RoomType $roomType;

    public function __construct()
    {
        $this->roomType = new RoomType();
    }
    public function index()
    {
        return response()->json($this->roomType->paginate(6));
    }
    public function store(StoreRoomTypeRequest $request)
    {
        $object = $request->all();
//        dd($object);
        $roomtype = new RoomType($object);
        $roomtype->save();
        return response()->json([
            'status'   => 'success',
            'message'  => 'Thêm loại phòng thành công !',
            'data'     => $roomtype
        ]);
    }
    public function show( $id)
    {
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
    }
    public function update(UpdateRoomTypeRequest $request,  $id)
    {
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
    }
    public function destroy( $id)
    {
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
    }
}
