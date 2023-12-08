<?php

namespace App\Modules\Services\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Modules\Services\Requests\StoreRequest;
use App\Modules\Services\Requests\UpdateRequest;
use App\Modules\Services\Resources\ServiceResource;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ServicesController extends Controller
{
    private Services $services;
    public function __construct()
    {
        $this->services = new Services();
    }
    public function index(Request $request)
    {
        try {
            $query = $this->services->newQuery();
            $query->where('branch_id', $request->user()->branch_id);
            $services = $query->paginate(10);
            return ServiceResource::collection($services);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không lấy ra được dữ liệu dịch vụ !'
            ]);
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $service = $this->services->create($request->all());
            return response()->json([
                'status' => 'Success',
                'message' => 'Thêm thành công !',
                'data' => $service
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi thêm dịch vụ không thành công !'
            ]);
        }

    }
    public function show($id)
    {
        try {
            $services = $this->services->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$services) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Danh mục không tồn tại !',
                    'data' => null
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Chi tiết danh mục !',
                'data' => new ServiceResource($services)
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi hiển thị dữ liệu dịch vụ không thành công!'
            ]);
        }

    }


    public function update(Request $request, $id)
    {
        try {
            $service = $this->services->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dịch vụ không tồn tại !',
                    'data' => null
                ]);
            }
            $name = $request->service_name;
            $update = $service->update([
                'service_name' => $name,
                'price' => $request->price,
                'description' => $request->description,
            ]);
            if ($update) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Cập nhật thành công !',
                    'data' => $service
                ]);
            }
        } catch (Exception $exception) {
            throw $exception;
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi cập nhật dữ liệu dịch vụ không thành công !'
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $service = $this->services->where('_id', $id)
                ->where('branch_id', request()->user()->branch_id)
                ->first();
            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dịch vụ không tồn tại !',
                    'data' => null
                ]);
            } else {
                $delete = $service->delete();
                if ($delete) {
                    return response()->json([
                        'status' => 'success',
                        'message' => 'Xóa thành công !',
                        'data' => $service
                    ]);
                }
            }
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi xóa không thành công dịch vụ !'
            ]);
        }
    }
}
