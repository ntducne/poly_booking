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

function create_permision()
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
    $user = Admin::where('email', 'superadmin@gmail.com')->first();
    foreach ($permission as $value) {
        AdminPermission::query()->updateOrCreate([
            'id_admin' => $user->id,
            'id_permission' => $value->id,
        ]);
    }
    echo "Create permission success";
}
