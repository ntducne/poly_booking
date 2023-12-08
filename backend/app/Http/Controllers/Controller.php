<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected function UploadImage($image, $folder): bool|string
    {
        return Cloudinary::upload($image->getRealPath(),[
            'public_id' => time().uniqid(),
            'folder' => $folder
        ])->getSecurePath();
    }

    protected function UploadMultiImage($images, $folder): array
    {
        $arr_images = [];
        foreach ($images as $image){
            $image_path = $this->UploadImage($image, $folder);
            $arr_images[] = $image_path;
        }
        return $arr_images;
    }

    protected function DeleteImage($image): void
    {
        $res = Http::get(env('CLOUDINARY_RESOURCE').'resources/image')->json();
        foreach ($res['resources'] as $item){
            if($item['secure_url'] == $image){
                Cloudinary::destroy($item['public_id']);
            }
        }
    }

    protected function DeleteDirectory($folder): void
    {
        Http::delete(env('CLOUDINARY_RESOURCE').'folders/'.$folder)->json();
    }

    protected function checkStatusBilling($order_code){
        $billing = Billing::where('billingCode', (integer)$order_code)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đơn không tồn tại.'
            ]);
        }
        if($billing->status == 0 && $billing->payment_method == 'cash'){
            return response()->json([
                'status' => false,
                'message' => 'Đơn không hỗ trợ thanh toán online.'
            ]);
        }
        if($billing->status == 1 || $billing->status == 3 || $billing->status == 5){
            return response()->json([
                'status' => false,
                'message' => 'Đơn đã thanh toán.'
            ]);
        }
        if($billing->status == 2 || $billing->status == 6 || $billing->status == 7){
            return response()->json([
                'status' => false,
                'message' => 'Đơn đã huỷ'
            ]);
        }
        if($billing->status == 4){
            return response()->json([
                'status' => false,
                'message' => 'Đơn đã trả phòng'
            ]);
        }
    }
}
