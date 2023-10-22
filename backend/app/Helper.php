<?php

use App\Models\Admin;
use App\Models\AdminPermission;
use App\Models\Permission;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

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

function create_permision(): void
{
    $routeCollection = Route::getRoutes();
    $dataPermissions = [];
    foreach ($routeCollection as $route) {
        if($route->getName() != null){
            if (str_contains($route->getName(), 'admin.')) {
                $parts = explode('.', $route->getName());
                if (count($parts) >= 3) {
                    $arr_item = [
                        $route->getName() => ucfirst($parts[1]) .' '. ucfirst($parts[2])
                    ];
                    $dataPermissions = array_merge($dataPermissions, $arr_item);
                }
            }
        }
    }
    $permission = Permission::all();
    foreach ($permission as $value) {
        if (!array_key_exists($value->name, $dataPermissions)) {
            $value->delete();
        }
    }
    foreach ($dataPermissions as $key => $value) {
        Permission::query()->updateOrCreate([
            'name' => $key,
        ]);
    }
    $admins = Admin::where('role', 0)->get();
    foreach ($admins as $admin){
        foreach ($permission as $value) {
            AdminPermission::query()->updateOrCreate([
                'id_admin' => $admin->id,
                'id_permission' => $value->id,
            ]);
        }
    }
    echo "Create permission success";
}

function convertToSlug($text) {
    // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    $text = trim($text);

    // Thay thế khoảng trắng và các ký tự đặc biệt bằng dấu gạch ngang
    $text = preg_replace('/[^A-Za-z0-9-]+/', '-', $text);

    // Chuyển tất cả ký tự thành chữ thường
    $text = strtolower($text);

    return $text;
}
