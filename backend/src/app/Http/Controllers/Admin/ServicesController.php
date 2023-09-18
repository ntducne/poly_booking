<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Http\Requests\Services\ServicesRequest;
use App\Http\Requests\Services\UpdateRequest;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    private Services $services;
    public function __construct()
    {
        $this->services = new Services();
    }
    public function index()
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
        $service = $this->services->create($request->all());
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
    public function update(UpdateRequest $request, $id){
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
