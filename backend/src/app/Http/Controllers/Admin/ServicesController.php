<?php

namespace App\Http\Controllers;

use App\Http\Requests\Services\ServicesRequest;
use App\Http\Requests\Services\UpdateRequest;
use Illuminate\Http\Request;
use App\Models\Services;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
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
        $services = $this->services->paginate(5);
        $response = [
            'message' => 'get Mongo',
            'data' => $services
        ];
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
    public function store(ServicesRequest $request)
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
    public function update(UpdateRequest $request, $id): JsonResponse|RedirectResponse
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
        if ($service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service không tồn tại !',
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
    }
}