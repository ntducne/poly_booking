<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Branch\StoreBranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Branch;

class BranchController extends Controller
{
    private Branch $branch;

    public function __construct(){
        $this->branch = new Branch();
    }
    public function index()
    {
        $branches = $this->branch->paginate(6);
        return response()->json([
            'message' => 'Get Data',
            'data'    => $branches,
        ]);
    }
    public function store(StoreBranchRequest $request)
    {
        $object = $request->all();
        $branch = new Branch($object);
        $branch->save();
        return response()->json([
            'status'    => 'success',
            'message'   => 'Thêm chi nhánh thành công !',
            'data'      => $branch
        ]);
    }
    public function show( $id)
    {
        $branch = $this->branch->find($id);
        if(!$branch){
            $response = [
                'status'   => 'error',
                'message'  => 'Chi nhánh không tồn tại !',
                'data'     => null,
            ];
        }else{
            $response = [
                'status'   => 'success',
                'message'  => 'Chi tiết chi nhánh !',
                'data'     => $branch,
            ];
        }
        return response()->json($response);
    }
    public function update(UpdateBranchRequest $request, $id)
    {
        $branch = Branch::find($id);
        if(!$branch){
            $reponse = [
                'status'  => 'error',
                'message' => 'Chi nhánh đãi không tồn tại !',
                'data'    => null,
            ];
        }else{
            $branch->update($request->all());
            $reponse = [
                'status'  => 'success',
                'message' => 'Cập nhập chi nhánh thành công !',
                'data'    => $branch,
            ];
        }
        return response()->json($reponse);
    }
    public function destroy($id)
    {
        $branch = Branch::find($id);
        if(!$branch){
            return response()->json([
                'status' => 'error',
                'message' => 'Chi nhánh không tồn tại !',
                'data' => null
            ]);
        }
        $branch->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá chi nhánh thành công !',
            'data' => $branch
        ]);
    }
}
