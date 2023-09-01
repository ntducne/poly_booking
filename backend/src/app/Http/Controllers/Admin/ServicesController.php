<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private Services $services;
    public function __construct()
    {
        $this->services = new Services();
    }
    public function index(): JsonResponse
    {
        $cachedServices = Redis::get('services');
        if ($cachedServices !== null) {
            $services = json_decode($cachedServices, true);
            $response = [
                'message' => 'get Redis',
                'data' => $services
            ];
        } else {
            $services = $this->services->paginate(5);
            Redis::set('services', json_encode($services));
            $response = [
                'message' => 'get Mongo',
                'data' => $services
            ];
        }
        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    public function store(Request $request)
    {
        $service = new Services($request->all());
        Redis::del('service');
        return response()->json([
            'status' => 'Success',
            'message' => 'Thêm thành công !',
            'data' => $service
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cachedServices = Redis::get('services_' . $id);
        if ($cachedServices !== null) {
            $services = json_decode($cachedServices, true);
        } else {
            $services = $this->services->find($id);
            if (!$services) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Danh mục không tồn tại !',
                    'data' => null
                ]);
            }
            Redis::set('services_' . $id, json_encode($services));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết danh mục !',
            'data' => $services
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit($id)
    // {

    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    public function update(Request $request, $id): JsonResponse|RedirectResponse
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service không tồn tại !',
                'data' => null
            ]);
        }
        $update = $service->update($request->all());
        if ($update) {
            Redis::del('service_', $id);
            Redis::del('servcie');
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $service
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $service = Services::find($id);
        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service không tồn tại !',
                'data' => null
            ]);
        }
        $delete = $service->delete();
        if ($delete) {
            Redis::del('service_', $id);
            Redis::del('servcie');
            return response()->json([
                'status' => 'success',
                'message' => 'Xóa thành công !',
                'data' => $service
            ]);
        }
    }
}
