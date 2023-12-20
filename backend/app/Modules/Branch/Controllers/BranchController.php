<?php

namespace App\Modules\Branch\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Modules\Branch\Requests\StoreBranchRequest;
use App\Modules\Branch\Requests\UpdateBranchRequest;
use App\Modules\Branch\Resources\BranchResource;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BranchController extends Controller
{
    private Branch $branch;

    public function __construct(){
        $this->branch = new Branch();
    }
    public function index(Request $request)
    {
        try {
            $branches = $this->branch->newQuery();
            if($request->name){
                $branches->where('name', 'LIKE', '%' . $request->name . '%');
            }
            return BranchResource::collection($branches->paginate(10));
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function store(StoreBranchRequest $request)
    {
        try {
            $object = $request->validated();
            $branch = new Branch($object);
            $branch->save();
            return response()->json([
                'status'    => 'success',
                'message'   => 'Thêm chi nhánh thành công !',
                'data'      => $branch
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function update(UpdateBranchRequest $request, $id)
    {
        try {
            $branch = $this->branch->find($id);
            if(!$branch){
                $reponse = [
                    'status'  => 'error',
                    'message' => 'Chi nhánh đãi không tồn tại !',
                    'data'    => null,
                ];
            }else{
                $branch->update($request->validated());
                $reponse = [
                    'status'  => 'success',
                    'message' => 'Cập nhập chi nhánh thành công !',
                    'data'    => $branch,
                ];
            }
            return response()->json($reponse);
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
            $branch = $this->branch->find($id);
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
        } catch(Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
}
