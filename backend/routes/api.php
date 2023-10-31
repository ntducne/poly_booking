<?php

//use App\Events\NewBillEvent;
use App\Http\Controllers\Pay\VnpayController;
use Illuminate\Support\Facades\Route;
Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json('Denied',403); });

Route::get('/routes', function () {
    $routeCollection = Route::getRoutes();

    echo "<table style='width:100%'>";
    echo "<tr>";
    echo "<td width='10%'><h4>HTTP Method</h4></td>";
    echo "<td width='10%'><h4>Route</h4></td>";
    echo "<td width='10%'><h4>Name</h4></td>";
    echo "<td width='70%'><h4>Corresponding Action</h4></td>";
    echo "</tr>";
    foreach ($routeCollection as $value) {
        echo "<tr>";
        echo "<td>" . $value->methods()[0] . "</td>";
        echo "<td>" . $value->uri() . "</td>";
        echo "<td>" . $value->getName() . "</td>";
        echo "<td>" . $value->getActionName() . "</td>";
        echo "</tr>";
    }
    echo "</table>";
});

Route::prefix('/permission')->group(function(){
    Route::get('/list', function(){
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
        return response()->json($dataPermissions);
    });
    Route::get('/', function () {
        $permissions = config('permissions');
        $configPermission = config('configPermission');
        $result = [];
        foreach ($configPermission as $item) {
            $name = $item['name'];
            $item['permissions'] = [];
            foreach ($permissions as $key => $value) {
                if (strpos($key, "admin.$name.") === 0) {
                    $item['permissions'][] = [$key => $value];
                }
            }
            $result[] = $item;
        }
        return response()->json($result);
    });
    Route::get('/reload', function (){
        create_permision();
    });
});

Route::prefix('vnpay')->group(function(){
    Route::get('process/{order_code}/{amount}', [VnpayController::class, 'process'])->name('vnpay.process');
    Route::get('callback', [VnpayController::class, 'callback'])->name('vnpay.callback');
});

Route::get('/notification', function(\Illuminate\Http\Request $request){
//    event(new NewBillEvent($request->msg));
    event(new \App\Events\Message([
        'message' => 'Hello world',
        'user' => 'John Doe',
        'time' => now()->format('d/m/Y H:i:s'),
        'avatar' => 'https://res.cloudinary.com/dteefej4w/image/upload/v1681474078/users/585e4bf3cb11b227491c339a_gtyczj.png'
    ]));
    // event(new \App\Events\Message('duc', 'hi ha hi'));
    // $user = \App\Models\User::where('email','nguyenduc10603@gmail.com')->first();
    // $user->notify(new \App\Notifications\SendMail());
});
