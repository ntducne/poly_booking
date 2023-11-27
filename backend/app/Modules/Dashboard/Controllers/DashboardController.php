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

    public function daily_revenue_statistics(Request $request){
        return $this->statsRepository->daily_revenue_statistics($request);
    }
    
}