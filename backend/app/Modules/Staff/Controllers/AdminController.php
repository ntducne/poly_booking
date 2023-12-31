<?php

namespace App\Modules\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Modules\Staff\Requests\StoreAdminRequest;
use App\Modules\Staff\Requests\UpdateAdminRequest;
use App\Modules\Staff\Resources\StaffResource;
use App\Modules\User\Requests\ChangePasswordRequest;
use App\Modules\User\Requests\UpdateProfileRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

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
            if ($request->has('name')) {
                $searchTerm = $request->input('name');
                $query->where('name', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('email')) {
                $searchTerm = $request->input('email');
                $query->where('email', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('phone')) {
                $searchTerm = $request->input('phone');
                $query->where('phone', 'LIKE', '%' . $searchTerm . '%');
            }
            if ($request->has('status')) {
                $searchTerm = $request->input('status');
                $query->where('status', $searchTerm);
            }
            if ($role === 'super_admin') {
                $response = $query
                ->where('role', 'admin')
                ->paginate(10);
                return StaffResource::collection($response);
            }
            $query->where('branch_id', $request->user()->branch_id);
            $response = $query
                // ->where('created_by', $request->user()->id)
                ->where('role', 'staff')
                ->where('_id', '!=', $request->user()->id)
                ->paginate(10);
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
                $object['role'] = $request->user()->role === 'super_admin' ? 'admin' : 'staff';
                $object['branch_id'] = $request->user()->role === 'super_admin' ? $request->branch_id : $request->user()->branch_id;
                $object['created_by'] = $request->user()->id;
                $object['password'] = Hash::make($object['password']);
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
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }
    }
    public function show(Request $request, $id)
    {
        try{

            if($request->user()->role == 'admin'){
                $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            }
            if($request->user()->role == 'super_admin'){
                $admin = $this->admin->where('_id', $id)->first();
            }
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
            if($request->user()->role == 'admin'){
                $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            }
            if($request->user()->role == 'super_admin'){
                $admin = $this->admin->where('_id', $id)->first();
            }
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
    public function destroy(Request $request, $id)
    {
        try{
            if($request->user()->role == 'admin'){
                $admin = $this->admin->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            }
            if($request->user()->role == 'super_admin'){
                $admin = $this->admin->where('_id', $id)->first();
            }
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

    public function getStaff(Request $request){
        $userId = request()->cookie('user_id');
        $user = Auth::loginUsingId($userId);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nhân viên không tồn tại hoặc chưa đăng nhập !',
                'data' => null
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Nhân viên không tồn tại hoặc chưa đăng nhập !',
                'data' => $user
            ]);
        }
    }
    public function profile(Request $request)
    {
        try{
            $admin = $request->user();
            return new StaffResource($admin);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        try{
            $admin = $request->user();
            $admin->fill($request->validated())->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhập thông tin thành công !',
            ]);
        } catch (Exception $exception){
            Log::debug($exception->getMessage());
            return response()->json([
                'status'  => false,
                'message' => 'Lỗi !'
            ]);
        }

    }

    public function updateAvatar(Request $request)
    {
        // try {
            $adminId = $request->user()->id;
            $user = Admin::find($adminId);
            if(!$user){
                return response()->json([
                    'status' => false,
                    'message' => 'Tài khoản không tồn tại !'
                ]);
            }
            $image = $request->file('image');
            if($image){
                $this->DeleteImage($user->image);
                $image_url = $this->UploadImage($image, 'admin/' . $adminId . '/');
                $user->image = $image_url;
            }
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhập thông tin thành công !',
            ]);
        // } catch (Exception $e) {
        //     Log::error($e->getMessage());
        //     return response()->json([
        //         'status'  => false,
        //         'message' => 'Lỗi !'
        //     ]);
        // }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try{
            $admin = $request->user();
            $input = $request->all();
            if (!Hash::check($input['old_password'], $admin->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Mật khẩu cũ không đúng !',
                ]);
            }
            $admin->password = Hash::make($input['new_password']);
            $admin->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhập mật khẩu thành công !',
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
