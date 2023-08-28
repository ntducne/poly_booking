<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
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
            $respoonse = [
              'message' => 'get Redis',
              'data' => $categories
            ];
        } else {
            $categories = $this->category->all();
            Redis::set('category', json_encode($categories));
            $respoonse = [
                'message' => 'get Mongo',
                'data' => $categories
            ];
        }
        return response()->json($respoonse);
    }
}
