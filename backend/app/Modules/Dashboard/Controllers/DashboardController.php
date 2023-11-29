<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\StatsRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller 
{
    // public function __construct(StatsRepository $statsRepository)
    // {
    //     $this->statsRepository = new StatsRepository();
    // }

    public function revenue_statistical(Request $request){
        $statsRepository = new StatsRepository();
        return $statsRepository->revenue($request);
        
        // dd(1);
        // if($request->module == 'revenue'){
        //     return $this->statsRepository->revenue($request);
        // } 
        // if($request->module == 'room'){

        //     return $this->statsRepository->room($request);
        // }
    }

    public function room(Request $request) {
        // return $this->statsRepository->room($request);
    }
}