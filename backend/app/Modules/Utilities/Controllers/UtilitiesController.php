<?php

namespace App\Modules\Utilities\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\Utilities;
use App\Modules\Utilities\Requests\StoreUtilitiesRequest;
use App\Modules\Utilities\Requests\UpdateUtilitiesRequest;
use Illuminate\Support\Facades\Log;
use Exception;

class UtilitiesController extends Controller
{
    private Utilities $utilities;

    public function __construct()
    {
        $this->utilities = new Utilities();
    }

    public function index(Request $request)
    {
        try {
            $query = $this->utilities->newQuery();
            $query->where('branch_id', $request->user()->branch_id);
            $utilities =  $query->paginate(10);
            return response()->json([
                'message' => 'Get Data',
                'data'    => $utilities,
            ]);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function store(StoreUtilitiesRequest $request)
    {
        try {
            $utilities = $this->utilities->create($request->validated());
            return response()->json([
                'status' => 'success',
                'message'   => 'Thêm tiện ích thành công !',
                'data'      => $utilities
            ]);
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function show($id)
    {
        try {
            $utilities = $this->utilities->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }

    public function update(UpdateUtilitiesRequest $request,  $id)
    {
        try {
            $utilities = $this->utilities->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
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
            $utilities = $this->utilities->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
}
