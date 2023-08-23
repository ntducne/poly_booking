<?php


use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

function UploadImageCloudinary($image, $folder){
    return Cloudinary::upload($image->getRealPath(),['public_id' => $folder.'/'.uniqid()])->getSecurePath();
}

function UploadImage($image, $folder): bool|string
{
    return Storage::disk('public')->putFile($folder, $image);
}

function UploadMultiImage($images, $folder): array
{
    $arr_images = [];
    foreach ($images as $image){
        $image_path   = UploadImage($image, $folder);
        $arr_images[] = $image_path;
    }
    return $arr_images;
}
