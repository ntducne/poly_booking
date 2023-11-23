<?php

namespace App\Modules\Policy\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CancellationPolicy\StoreCancellationPolicyRequest;
use App\Http\Requests\CancellationPolicy\UpdateCancellationPolicyRequest;
use App\Models\CancellationPolicy;
use Exception;
use Illuminate\Support\Facades\Log;

class CancellationPolicyController extends Controller
{
    private CancellationPolicy $cancellationPolicy;

    public function __construct()
    {
        $this->cancellationPolicy = new CancellationPolicy();
    }

    public function index()
    {
        try {
            $cancellationPolicy =  $this->cancellationPolicy->paginate(6);
            return response()->json([
                'message' => 'Get Data',
                'data'    => $cancellationPolicy,
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function store(StoreCancellationPolicyRequest $request)
    {
        try {
            $object = $request->all();
            $cancellationPolicy = new CancellationPolicy($object);
            $cancellationPolicy->save();
            return response()->json([
                'status' => 'success',
                'message'   => 'Thêm chính sách hủy phòng thành công !',
                'data'      => $cancellationPolicy
            ]);
        } catch (Exception $exception){
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
            $cancellationPolicy = $this->cancellationPolicy->find($id);
            if(!$cancellationPolicy){
                return response()->json([
                    'status' => 'error',
                    'message' => ' Chính sách hủy phòng không tồn tại !',
                    'data' => null
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết chính sách !',
                'data' => $cancellationPolicy
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }

    public function update(UpdateCancellationPolicyRequest $request,  $id)
    {
        try {
            $cancellationPolicy = CancellationPolicy::find($id);
            if (!$cancellationPolicy) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Chính sách hủy phòng không tồn tại !',
                    'data' => null
                ]);
            }
            $cancellationPolicy->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật chính sách hủy thành công !',
                'data' => $cancellationPolicy
            ]);
        } catch (Exception $exception){
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
            $cancellationPolicy = CancellationPolicy::find($id);
            if (!$cancellationPolicy) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Chính sách hủy phòng không tồn tại !',
                    'data' => null
                ]);
            }
            $cancellationPolicy->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá chính sách thành công !',
                'data' => $cancellationPolicy
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }


    }
}
