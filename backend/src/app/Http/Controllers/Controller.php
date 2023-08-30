<?php

namespace App\Http\Controllers;

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
}
