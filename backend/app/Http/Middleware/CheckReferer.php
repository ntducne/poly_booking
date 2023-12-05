<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckReferer
{
    public function handle(Request $request, Closure $next)
    {
        if($request->segment(1) !== 'user' && $request->segment(1) !== 'admin'){
            return response()->json(['message' => 'You do not have access !'], 403);
        }
        return $next($request);
    }
}
