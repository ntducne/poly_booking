<?php

namespace App\Repositories;

use App\Models\Billing;
use Illuminate\Support\Carbon;

class StatsRepository
{
    private Billing $billing;
    public function __construct()
    {
        $this->billing = new Billing();
    }

    public function daily_revenue_statistics($request){
        // lấy ngày gửi lên
        $day = $request->day;
        if(Carbon::parse($day)->gt(Carbon::parse(Carbon::now()))){
            return response()->json([
                'message' => 'Ngày thống kê không được lớn hơn ngày hiện tại !'
            ]);
        }
        else {
            $data = $this->billing
                ->where('created_at', '>=', Carbon::parse($day)->startOfDay())
                ->where('created_at', '<=', Carbon::parse($day)->endOfDay())
                ->get();
            $returnData = [
                'days' => Carbon::parse($day)->format('d/m/Y'),
                'total' => $data->sum('total')
            ];
            return $returnData;
        }
    }

    public function day_to_day_revenue_statistics($request) {
        // lấy ngày gửi lên
        $startDay = $request->startDay;
        $endDay = $request->endDay;
        if(Carbon::parse($endDay)->gt(Carbon::parse(Carbon::now()))){
            return response()->json([
                'message' => 'Ngày thống kê không được lớn hơn ngày hiện tại !'
            ]);
        }
        else {
            $data = $this->billing
            ->where('created_at', '>=', Carbon::parse($startDay))
            ->where('created_at', '<=', Carbon::parse($endDay))
            ->get();
            return $data;
        }
    }

    public function weekly_revenue_statistics($request){
        $data = $this->billing->selectRaw('sum(total) as total, week(created_at) as week')
            ->where('created_at', '>=', $request->start_date)
            ->where('created_at', '<=', $request->end_date)
            ->groupBy('week')
            ->get();
        return $data;
    }

    public function monthly_revenue_statistics($request){
        $data = $this->billing->selectRaw('sum(total) as total, month(created_at) as month')
            ->where('created_at', '>=', $request->start_date)
            ->where('created_at', '<=', $request->end_date)
            ->groupBy('month')
            ->get();
        return $data;
    }

    public function yearly_revenue_statistics($request){
        $data = $this->billing->selectRaw('sum(total) as total, year(created_at) as year')
            ->where('created_at', '>=', $request->start_date)
            ->where('created_at', '<=', $request->end_date)
            ->groupBy('year')
            ->get();
        return $data;
    }



}