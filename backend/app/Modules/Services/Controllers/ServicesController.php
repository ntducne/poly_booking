<?php

namespace App\Modules\Services\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Modules\Services\Requests\StoreRequest;
use App\Modules\Services\Requests\UpdateRequest;
use App\Modules\Services\Resources\ServiceResource;
use Exception;
use Illuminate\Support\Facades\Log;

class ServicesController extends Controller
{
    private Services $services;
    public function __construct()
    {
        $this->services = new Services();
    }
    public function index()
    {
        try {
            $services = $this->services->paginate(5);
            // $response = [
            //     'message' => 'get Mongo',
            //     'data' => $services
            // ];
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
            $services = $this->services->find($id);
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


    public function update(UpdateRequest $request, $id)
    {
        try {
            $service = Services::find($id);
            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Dịch vụ không tồn tại !',
                    'data' => null
                ]);
            }
            $update = $service->update($request->all());
            if ($update) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Cập nhật thành công !',
                    'data' => $service
                ]);
            }
        } catch (Exception $exception) {
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
            $service = Services::find($id);
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
