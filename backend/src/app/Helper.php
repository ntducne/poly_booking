<?php

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Http;

function UploadImage($image, $folder)
{
    return Cloudinary::upload($image->getRealPath(),[
        'public_id' => time().uniqid(),
        'folder' => $folder
    ])->getSecurePath();
}

function UploadMultiImage($images, $folder): array
{
    $arr_images = [];
    foreach ($images as $image){
        $image_path = UploadImage($image, $folder);
        $arr_images[] = $image_path;
    }
    return $arr_images;
}

function DeleteImage($image): void
{
    $res = Http::get(env('CLOUDINARY_RESOURCE').'resources/image')->json();
    foreach ($res['resources'] as $item){
        if($item['secure_url'] == $image){
            Cloudinary::destroy($item['public_id']);
        }
    }
}

function DeleteDirectory($folder): void
{
    Http::delete(env('CLOUDINARY_RESOURCE').'folders/'.$folder)->json();
}
