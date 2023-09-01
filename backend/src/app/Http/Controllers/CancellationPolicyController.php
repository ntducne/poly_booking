<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancellationPolicy\StoreCancellationPolicyRequest;
use App\Http\Requests\CancellationPolicy\UpdateCancellationPolicyRequest;
use App\Http\Requests\Request;
use App\Models\CancellationPolicy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class CancellationPolicyController extends Controller
{
    private CancellationPolicy $cancellationPolicy;

    public function __construct()
    {
        $this->cancellationPolicy = new CancellationPolicy();
    }

    public function index()
    {
        $cancellationPolicy =  $this->cancellationPolicy->paginate(6);
        return response()->json([
            'message' => 'Get Data',
            'data'    => $cancellationPolicy,
        ]);
    }
    public function store(StoreCancellationPolicyRequest $request)
    {
        $object = $request->all();
        $cancellationPolicy = new CancellationPolicy($object);
        $cancellationPolicy->save();
        return response()->json([
            'status' => 'success',
            'message'   => 'Thêm chính sách hủy phòng thành công !',
            'data'      => $cancellationPolicy
        ]);
    }
    public function show($id)
    {
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
    }

    public function update(UpdateCancellationPolicyRequest $request,  $id)
    {
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
    }
    public function destroy($id)
    {
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
    }
}
