<?php

namespace App\Repositories\Stats;

use App\Interfaces\StatInterface;
use App\Models\Billing;
use Carbon\Carbon;

class Revenue implements StatInterface
{
    private Billing $billing;

    public function __construct()
    {
        $this->billing = new Billing();
    }
    
    public function getData($request){
        return $this->billing->whereIn('status', array_map(function ($item) { return (int)$item; }, $request->status))->get();
    }

    public function daily($request){
        $day = $request->day;
        $total = 0;
        $sinceTotal = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') === Carbon::parse($day)->format('Y-m-d')) {
                $total += $item->total;
            }
            if (Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($day)->subDay()->format('Y-m-d')) {
                $sinceTotal += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($day)->format('d/m/Y'),
            'total' => $total,
            'since_yesterday' => tinhPhanTramTuHaiSo($total, $sinceTotal),
        ];
        return $returnData;
    }

    public function weekly($request){
        $week = $request->week;
        $total = 0;
        $sinceTotal = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') === $week) {
                $total += $item->total;
            }
            if (Carbon::parse($item->created_at)->format('Y-W') <= Carbon::parse($week)->subWeek()->format('Y-W')) {
                $sinceTotal += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($week)->format('W/Y'),
            'total' => $total,
            'since_last_week' => tinhPhanTramTuHaiSo($total, $sinceTotal),
        ];
        return $returnData;
    }

    public function monthly($request){
        $month = $request->month;
        $total = 0;
        $sinceTotal = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') === Carbon::parse($month)->format('Y-m')) {
                $total += $item->total;
            }
            if (Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($month)->subMonth()->format('Y-m')) {
                $sinceTotal += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($month)->format('m/Y'),
            'total' => $total,
            'since_last_month' => tinhPhanTramTuHaiSo($total, $sinceTotal),
        ];
        return $returnData;
    }

    public function yearly($request){
        $year = $request->year;
        $total = 0;
        $sinceTotal = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y') === Carbon::parse($year)->format('Y')) {
                $total += $item->total;
            }
            if (Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($year)->subYear()->format('Y')) {
                $sinceTotal += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($year)->format('Y'),
            'total' => $total,
            'since_last_year' => tinhPhanTramTuHaiSo($total, $sinceTotal),
        ];
        return $returnData;
    }

    public function day_to_day($request){
        $fromDay = $request->fromDay;
        $toDay = $request->toDay;
        $total = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') >= Carbon::parse($fromDay)->format('Y-m-d') && Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($toDay)->format('Y-m-d')) {
                $total += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($fromDay)->format('d/m/Y') . ' - ' . Carbon::parse($toDay)->format('d/m/Y'),
            'total' => $total,
        ];
        return $returnData;
    }

    public function week_to_week($request){
        $fromWeek = $request->fromWeek;
        $toWeek = $request->toWeek;
        $total = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') >= $fromWeek && Carbon::parse($item->created_at)->format('Y-W') <= $toWeek) {
                $total += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($fromWeek)->format('W/Y') . ' - ' . Carbon::parse($toWeek)->format('W/Y'),
            'total' => $total,
        ];
    }

    public function month_to_month($request){
        $fromMonth = $request->fromMonth;
        $toMonth = $request->toMonth;
        $total = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') >= Carbon::parse($fromMonth)->format('Y-m') && Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($toMonth)->format('Y-m')) {
                $total += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($fromMonth)->format('m/Y') . ' - ' . Carbon::parse($toMonth)->format('m/Y'),
            'total' => $total,
        ];
        return $returnData;
    }

    public function year_to_year($request){
        $fromYear = $request->fromYear;
        $toYear = $request->toYear;
        $total = 0;
        $data = $this->getData($request);
        foreach ($data as $item) {
            if (Carbon::parse($item->created_at)->format('Y') >= Carbon::parse($fromYear)->format('Y') && Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($toYear)->format('Y')) {
                $total += $item->total;
            }
        }
        $returnData = [
            'days' => Carbon::parse($fromYear)->format('Y') . ' - ' . Carbon::parse($toYear)->format('Y'),
            'total' => $total,
        ];
        return $returnData;
    }
}