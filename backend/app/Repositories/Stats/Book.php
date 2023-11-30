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
    
    public function getDataBook(){
        return $this->billing->where('status', 4)->get();
    }
    public function getDataCancel(){
        return $this->billing->whereIn('status', [2, 6])->get();
    }

    public function daily($request){
        $day = $request->day;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        $countBookYesterday = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') === Carbon::parse($day)->format('Y-m-d')) {
                $countBook++;
            }
            if (Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($day)->subDay()->format('Y-m-d')) {
                $countBookYesterday++;
            }
        }
        $countCancel = 0;
        $countCancelYesterday = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') === Carbon::parse($day)->format('Y-m-d')) {
                $countCancel++;
            }
            if (Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($day)->subDay()->format('Y-m-d')) {
                $countCancelYesterday++;
            }
        }
        $returnData = [
            'book' => $countBook,
            'cancel' => $countCancel,
            'since_book_yesterday' => tinhPhanTramTuHaiSo($countBook, $countBookYesterday),
            'since_cancel_yesterday' => tinhPhanTramTuHaiSo($countCancel, $countCancelYesterday),
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
        return $returnData;

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