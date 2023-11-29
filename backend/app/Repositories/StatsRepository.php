<?php

namespace App\Repositories;

use App\Repositories\Stats\Revenue;
use App\Repositories\Stats\Room;

class StatsRepository
{
    private Revenue $revenue;
    private Room $room;

    public function revenue($request)
    {
        $this->revenue = new Revenue();
        if($request->type === 'daily'){
            return $this->revenue->daily($request);
        }
        if($request->type === 'weekly'){
            return $this->revenue->weekly($request);
        }
        if($request->type === 'monthly'){
            return $this->revenue->monthly($request);
        }
        if($request->type === 'yearly'){
            return $this->revenue->yearly($request);
        }
        if($request->type === 'day_to_day'){
            return $this->revenue->day_to_day($request);
        }
        if($request->type === 'week_to_week'){
            return $this->revenue->week_to_week($request);
        }
        if($request->type === 'month_to_month'){
            return $this->revenue->month_to_month($request);
        }
        if($request->type === 'year_to_year'){
            return $this->revenue->year_to_year($request);
        }
    }

    public function room($request)
    {
        $this->room = new Room();

        return $this->room->daily($request);
    }
}