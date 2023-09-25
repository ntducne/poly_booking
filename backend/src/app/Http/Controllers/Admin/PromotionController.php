<?php

namespace app\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Promotion\StorePromotionRequest;
use App\Http\Requests\Promotion\UpdatePromotionRequest;
use App\Models\Promotion;

class PromotionController extends Controller
{
    private Promotion $promotion;

    public function __construct()
    {
        $this->promotion = new Promotion();
    }

    public function index()
    {
        $promotion = $this->promotion->paginate(6);
        $response = [
            'message' => 'Get Data',
            'data'    => $promotion,
        ];
        return response()->json($promotion);
    }

    public function store(StorePromotionRequest $request)
    {
        $object = $request->all();
        $promotion = new Promotion($object);
        $promotion->save();
        return response()->json([
            'status'    => 'success',
            'message'   => 'Thêm ưu đãi thành công !',
            'data'      => $promotion
        ]);
    }
    public function show( $id)
    {
        $promotion = $this->promotion->find($id);
        if(!$promotion){
            $response = [
                'status'   => 'error',
                'message'  => 'Ưu đãi không tồn tại !',
                'data'     => null,
            ];
        }else{
            $response = [
                'status'   => 'success',
                'message'  => 'Chi tiết Ưu đãi !',
                'data'     => $promotion,
            ];
        }
        return response()->json($response);
    }
    public function update(UpdatePromotionRequest $request, $id)
    {
        $promotion = Promotion::find($id);
        if(!$promotion){
            $reponse = [
                'status'  => 'error',
                'message' => 'Mã ưu đãi không tồn tại !',
                'data'    => null,
            ];
        }else{
            $promotion->update($request->all());
            $reponse = [
                'status'  => 'success',
                'message' => 'Cập nhập Mã ưu đãi thành công !',
                'data'    => $promotion,
            ];
        }
        return response()->json($reponse);
    }
    public function destroy( $id)
    {
        $promotion = Promotion::find($id);
        if(!$promotion){
            return response()->json([
                'status' => 'error',
                'message' => 'Ưu đãi không tồn tại !',
                'data' => null
            ]);
        }
        $promotion->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá mã ưu đãi thành công !',
            'data' => $promotion
        ]);
    }
}