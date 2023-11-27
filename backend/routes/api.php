<?php

use App\Modules\Dashboard\Controllers\DashboardController;
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
Route::get('/daily_revenue_statistics', [DashboardController::class, 'daily_revenue_statistics']);
Route::get('/weekly_revenue_statistics', [DashboardController::class, 'weekly_revenue_statistics']);
Route::get('/monthly_revenue_statistics', [DashboardController::class, 'monthly_revenue_statistics']);
Route::get('/yearly_revenue_statistics', [DashboardController::class, 'yearly_revenue_statistics']);