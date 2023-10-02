<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
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

    public function index(){
        $admin = $this->admin->paginate(6);
        $response = [
            'message' => 'Get Data',
            'data'    => $admin
        ];
        return response()->json($response);
    }
    public function store(StoreAdminRequest $request)
    {
        $object = $request->all();
        $image = $request->file('image');
        if($image){
            $uploadImage = $this->UploadImage($image, 'admin');
            $object['image'] = $uploadImage;
            $admin = new Admin($object);
            $admin->save();
            $response = [
                'status' => 'success',
                'message' => 'Thêm nhân viên thành công ! ',
                'data'    => $admin
            ];
        }else{
            $response = [
                'status' => 'error',
                'message' => 'Thêm nhân viên không thành công ! ',
                'data'    => null
            ];
        }
        return response()->json($response);
    }

    public function show( $id)
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
        if(!$admin){
            return response()->json([
                'status' => 'error',
                'message' => 'Nhân viên không tồn tại !',
                'data' => null
            ]);
        }
        $image = $request->file('image');
        if($image){
            $delImage = $this->DeleteImage($admin['image']);
            if($delImage){
                $uploadImage = $this->UploadImage($image, 'admin');
                $request->image = $uploadImage;
            }
        }else{
            $request->image = $admin['image'];
        }
        $admin->update($request->all());
        return response()->json([
            'status'   => 'success',
            'message' => 'Cập nhập nhân viên thành công !',
            'data'    => $admin
        ]);
    }
    public function destroy( $id)
    {
        $admin = Admin::find($id);
        if(!$admin){
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
}
