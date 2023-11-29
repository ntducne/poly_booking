<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\StatsRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller {
    private StatsRepository $statsRepository;
    public function __construct(
        StatsRepository $statsRepository
    )
    {
        $this->statsRepository = $statsRepository;
    }

    public function statistical(Request $request){
        echo 1;
        // if($request->module == 'revenue'){
        //     return $this->statsRepository->revenue($request);
        // } 
        // if($request->module == 'room'){

        //     return $this->statsRepository->room($request);
        // }
    }
}