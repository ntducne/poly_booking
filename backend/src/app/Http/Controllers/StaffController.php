<?php

namespace App\Http\Controllers;

use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redis;

class StaffController extends Controller
{
    private Staff $staff;
    public function __construct()
    {
        $this->staff = new Staff();
    }
    public function index()
    {
        $cachedStaff = Redis::get('staffs');
//        dd($cachedStaff);
        if($cachedStaff !== null){
            $staffs = json_decode($cachedStaff, true);
            $response = [
                'message' => 'get Resdis',
                'data'    => $staffs
            ];
        }else{
            $staffs = $this->staff->paginate(6);
            Redis::set('staffs', json_encode($staffs));
            $response = [
                'message' => 'get Mongo',
                'data'    => $staffs
            ];
        }
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
            Redis::del('staffs');
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
        $cachedStaff = Redis::get('staffs_' .$id);
        if ($cachedStaff !== null) {
            $staff = json_decode($cachedStaff, true);
        }
        else {
            $staff = $this->staff->find($id);
            if (!$staff) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nhân viên không tồn tại !',
                    'data' => null
                ]);
            }
            Redis::set('staffs_' . $id, json_encode($staff));
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
        Redis::del('staffs_' .$id);
        Redis::del('staffs');
        return response()->json([
           'status'   => 'success',
            'message' => 'Cập nhập nhân viên thành công !',
            'dâta'    => $staff
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
        Redis::del('staffs_' . $id);
        Redis::del('staffs');
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá thành công !',
            'data' => $staff
        ]);
    }
}
