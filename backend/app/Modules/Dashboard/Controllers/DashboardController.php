<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\StatsRepository;
use Illuminate\Http\Request;
class DashboardController extends Controller
{
    private StatsRepository $statsRepository;
    public function __construct()
    {
        $this->statsRepository = new StatsRepository();
    }
    public function statistical(Request $request){
        if($request->module == 'revenue'){
            return $this->statsRepository->revenue($request);
        }
        if($request->module == 'room'){

            return $this->statsRepository->room($request);
        }
        if($request->module == 'book'){
            return $this->statsRepository->book($request);
        }
    }
    public function chartRevenue(Request $request){
        return $this->statsRepository->chart($request);
    }
}
