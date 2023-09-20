<?php
use Illuminate\Support\Facades\Route;
Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json('Denied',403); });
Route::get('/routes', function () {
    $routeCollection = Route::getRoutes();


    echo "<table border='1'>";
    echo "<tr>";
    echo "<td width='10%'><h4>Route</h4></td>";
    echo "<td width='10%'><h4>Name</h4></td>";
    echo "</tr>";
    foreach ($routeCollection as $value) {
        echo "<tr>";
        echo "<td>" . $value->uri() . "</td>";
        echo "<td>" . $value->getName() . "</td>";
        echo "</tr>";
    }
    echo "</table>";
});
