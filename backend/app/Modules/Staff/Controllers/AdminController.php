<?php

namespace App\Modules\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Modules\Staff\Requests\StoreAdminRequest;
use App\Modules\Staff\Requests\UpdateAdminRequest;
use App\Modules\Staff\Resources\StaffResource;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    private Admin $admin;
    public function __construct()
    {
        $this->admin = new Admin();
    }
    public function index(Request $request)
    {
        try{
            $role = $request->user()->role;
            $query = $this->admin->newQuery();
            // $query->where('branch_id', $request->user()->branch_id);
            // if ($role == '') {
            //     $response = $query->paginate(10);
            // }
            // if ($role == 1) {
            //     $response = $query->where('created_by', $request->user()->id)->paginate(10);
            // }
            $response = $query->get();
            return StaffResource::collection($response);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
               'status'  => false,
               'message' => 'Lỗi !'
            ]);
        }
    }
    public function store(StoreAdminRequest $request)
    {
        try{
            $object = $request->validated();
            $image = $request->file('image');
            if ($image) {
                $uploadImage = $this->UploadImage($image, 'admin');
                $object['image'] = $uploadImage;
                $admin = new Admin($object);
                $admin->save();
                $response = [
                    'status' => 'success',
                    'message' => 'Thêm nhân viên thành công ! ',
                    'data'    => $admin
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Thêm nhân viên không thành công ! ',
                    'data'    => null
                ];
            }
//            return response()->json($response);
            return StaffResource::collection($response);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function show($id)
    {
        try{
            $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$admin) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết nhân viên !',
                'data' => [
                    'information' => new StaffResource($admin),
                    'permissions' => $admin->getAllPermission()
                ],
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function update(UpdateAdminRequest $request,  $id)
    {
        try{
            $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$admin) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
            $input = $request->validated();
            $image = $request->file('image');
            if ($image) {
                $this->DeleteImage($admin['image']);
                $uploadImage = $this->UploadImage($image, 'admin');
                $input->image = $uploadImage;
            } else {
                $input->image = $admin['image'];
            }
            $admin->fill($input)->save();
            return response()->json([
                'status'   => 'success',
                'message' => 'Cập nhập nhân viên thành công !',
                'data'    => new StaffResource($admin)
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function destroy($id)
    {
        try{
            $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$admin) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
            $admin->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xoá thành công !',
                'data' => $admin
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
    public function assignPermission(Request $request, $id)
    {
        try{
            $admin = Admin::find($id);
            if (!$admin) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
            $admin->syncPermission($request->permissions);
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhập quyền thành công !',
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }

    }
}
