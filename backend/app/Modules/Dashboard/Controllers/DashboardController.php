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

    public function revenue_statistics(Request $request){
        if($request->type == null){
            return response()->json([
                'message' => 'Không có dữ liệu !'
            ]);
        }
        if($request->type == 'daily'){
            return $this->statsRepository->daily_revenue_statistics($request);
        } 
        if($request->type == 'day_to_day'){
            return $this->statsRepository->day_to_day_revenue_statistics($request);
        } 
        if($request->type == 'weekly'){
            return $this->statsRepository->weekly_revenue_statistics($request);
        }
        if($request->type == 'week_to_week'){
            return $this->statsRepository->week_to_week_revenue_statistics($request);
        }
        if($request->type == 'monthly'){
            return $this->statsRepository->monthly_revenue_statistics($request);
        }
        if($request->type == 'month_to_month'){
            return $this->statsRepository->month_to_month_revenue_statistics($request);
        }
        if($request->type == 'yearly'){
            return $this->statsRepository->yearly_revenue_statistics($request);
        }
        if($request->type == 'year_to_year'){
            return $this->statsRepository->year_to_year_revenue_statistics($request);
        }
    }
    
}