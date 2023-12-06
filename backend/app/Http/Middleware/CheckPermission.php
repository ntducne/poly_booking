<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route()->getName();
        $user  = $request->user()->getAllPermission();
        if (!in_array($route, $user) && $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập !'
            ], 403);
        }
        return $next($request);
    }
}
