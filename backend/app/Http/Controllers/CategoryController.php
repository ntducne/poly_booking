<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CategoryController extends Controller
{
    private Category $category;

    public function __construct()
    {
        $this->category = new Category();
    }

    public function index(): JsonResponse
    {
        $cachedCategory = Redis::get('category');
        if ($cachedCategory !== null) {
            $categories = json_decode($cachedCategory, true);
            $response = [
              'message' => 'get Redis',
              'data' => $categories
            ];
        } else {
            $categories = $this->category->paginate(6);
            Redis::set('category', json_encode($categories));
            $response = [
                'message' => 'get Mongo',
                'data' => $categories
            ];
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $category = new Category($request->all());
        $category->save();
        Redis::del('category');
        return response()->json([
            'status' => 'success',
            'message' => 'Thêm mới thành công !',
            'data' => $category
        ]);
    }

    public function show($id)
    {
        $cachedCategory = Redis::get('category_' . $id);

        if ($cachedCategory !== null) {
            $category = json_decode($cachedCategory, true);
        }
        else {
            $category = $this->category->find($id);
            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Danh mục không tồn tại !',
                    'data' => null
                ]);
            }
            Redis::set('category_' . $id, json_encode($category));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Chi tiết danh mục !',
            'data' => $category
        ]);
    }

    public function update(Request $request, $id): JsonResponse|RedirectResponse
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại !',
                'data' => null
            ]);
        }
        $category->update($request->all());
        Redis::del('category_' . $id);
        Redis::del('category');
        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật thành công !',
            'data' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Danh mục không tồn tại !',
                'data' => null
            ]);
        }
        $category->delete();
        Redis::del('category_' . $id);
        Redis::del('category');
        return response()->json([
            'status' => 'success',
            'message' => 'Xoá thành công !',
            'data' => $category
        ]);
    }

}
