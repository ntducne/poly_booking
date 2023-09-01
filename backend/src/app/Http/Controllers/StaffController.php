<?php

namespace App\Http\Controllers;

use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class StaffController extends Controller
{
    private Staff $staff;
    public function __construct()
    {
        $this->staff = new Staff();
    }
    public function index()
    {
        $staffs = $this->staff->paginate(6);
        $response = [
            'message' => 'Get Data',
            'data'    => $staffs
        ];
        return response()->json($response);
    }
    public function store(StoreStaffRequest $request)
    {
        $object = $request->all();
        $image = $request->file('image');
        if($image){
            $uploadImage = $this->UploadImage($image, 'ImageStaff');
            $object['image'] = $uploadImage;
            $staff = new Staff($object);
            $staff->save();
            $response = [
                'status' => 'success',
                'message' => 'Thêm nhân viên thành công ! ',
                'data'    => $staff
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
            $staff = $this->staff->find($id);
            if (!$staff) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết nhân viên !',
            'data' => $staff
        ]);
    }
    public function update(UpdateStaffRequest $request,  $id)
    {
        $staff = Staff::find($id);
        if(!$staff){
            return response()->json([
                'status' => 'error',
                'message' => 'Nhân viên không tồn tại !',
                'data' => null
            ]);
        }
        $image = $request->file('image');
        if($image){
            $delImage = $this->DeleteImage($staff['image']);
            if($delImage){
                $uploadImage = $this->UploadImage($image, 'ImageStaff');
                $request->image = $uploadImage;
            }
        }else{
            $request->image = $staff['image'];
        }
        $staff->update($request->all());
        return response()->json([
           'status'   => 'success',
            'message' => 'Cập nhập nhân viên thành công !',
            'data'    => $staff
        ]);
    }
    public function destroy( $id)
    {
        $staff = Staff::find($id);
        if(!$staff){
            return response()->json([
                'status' => 'error',
                'message' => 'Nhân viên không tồn tại !',
                'data' => null
            ]);
        }
        $staff->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá thành công !',
            'data' => $staff
        ]);
    }
}
