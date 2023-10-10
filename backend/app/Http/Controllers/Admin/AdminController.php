<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
use App\Http\Resources\StaffResource;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    private Admin $admin;
    public function __construct()
    {
        $this->admin = new Admin();
    }
    public function index(Request $request)
    {
        $role = $request->user()->role;
        if ($role == 0) {
            $response = $this->admin->paginate(10);
        }
        if ($role == 1) {
            $response = $this->admin->where('created_by', $request->user()->id)->paginate(10);
        }
        return StaffResource::collection($response);
    }
    public function store(StoreAdminRequest $request)
    {
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
        return response()->json($response);
    }

    public function show($id)
    {
        $admin = $this->admin->find($id);
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
            'data' => $admin
        ]);
    }
    public function update(UpdateAdminRequest $request,  $id)
    {
        $admin = Admin::find($id);
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
            'data'    => $admin
        ]);
    }
    public function destroy($id)
    {
        $admin = Admin::find($id);
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
    }
    public function assignPermission(Request $request, $id){
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
    }
}
