<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Utilities\StoreUtilitiesRequest;
use App\Http\Requests\Utilities\UpdateUtilitiesRequest;
use App\Models\Utilities;

class UtilitiesController extends Controller
{
    private Utilities $utilities;

    public function __construct()
    {
        $this->utilities = new Utilities();
    }

    public function index()
    {
        $utilities =  $this->utilities->paginate(6);
        return response()->json([
            'message' => 'Get Data',
            'data'    => $utilities,
        ]);
    }
    public function store(StoreUtilitiesRequest $request)
    {
        $object = $request->all();
        $utilities = new Utilities($object);
        $utilities->save();
        return response()->json([
            'status' => 'success',
            'message'   => 'Thêm tiện ích thành công !',
            'data'      => $utilities
        ]);
    }
    public function show($id)
    {
        $utilities = $this->utilities->find($id);
        if(!$utilities){
            return response()->json([
                'status' => 'error',
                'message' => 'Tiện ích không tồn tại !',
                'data' => null
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết tiện ích !',
            'data' => $utilities
        ]);
    }

    public function update(UpdateUtilitiesRequest $request,  $id)
    {
        $utilities = Utilities::find($id);
        if (!$utilities) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tiện ích không tồn tại !',
                'data' => null
            ]);
        }
        $utilities->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật tiện ích thành công !',
            'data' => $utilities
        ]);
    }
    public function destroy($id)
    {
        $utilities = Utilities::find($id);
        if (!$utilities) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tiện ích không tồn tại !',
                'data' => null
            ]);
        }
        $utilities->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá tiện ích thành công !',
            'data' => $utilities
        ]);
    }
}
