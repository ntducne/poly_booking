<?php

namespace App\Repositories;

use App\Repositories\Stats\Book;
use App\Repositories\Stats\Chart;
use App\Repositories\Stats\Revenue;
use App\Repositories\Stats\Room;

class StatsRepository
{
    private Revenue $revenue;
    private Room $room;
    private Book $book;
    private Chart $chart;

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

    public function book($request){
        $this->book = new Book();
        if($request->type === 'daily'){
            return $this->book->daily($request);
        }
        if($request->type === 'weekly'){
            return $this->book->weekly($request);
        }
        if($request->type === 'monthly'){
            return $this->book->monthly($request);
        }
        if($request->type === 'yearly'){
            return $this->book->yearly($request);
        }
        if($request->type === 'day_to_day'){
            return $this->book->day_to_day($request);
        }
        if($request->type === 'week_to_week'){
            return $this->book->week_to_week($request);
        }
        if($request->type === 'month_to_month'){
            return $this->book->month_to_month($request);
        }
        if($request->type === 'year_to_year'){
            return $this->book->year_to_year($request);
        }
    }
    public function chart($request){
        $this->chart = new Chart();
        return $this->chart->yearly($request);
        
    }
}
