<?php

namespace App\Repositories\Stats;

use App\Interfaces\StatInterface;
use App\Models\Billing;
use Carbon\Carbon;

class Book implements StatInterface
{
    private Billing $billing;

    public function __construct()
    {
        $this->billing = new Billing();
    }

    public function getDataBook($request){
        return $this->billing->where('branch_id', '=', 
            $request->user()->branch_id
        )->whereIn('status', [3, 4])->get();
    }

    public function getDataCancel($request){
        return $this->billing->where('branch_id', '=', $request->user()->branch_id)->whereIn('status', [2, 6])->get();
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
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        $countBookYesterday = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') === Carbon::parse($week)->format('Y-W')) {
                $countBook++;
            }
            if (Carbon::parse($item->created_at)->format('Y-W') <= Carbon::parse($week)->subWeek()->format('Y-W')) {
                $countBookYesterday++;
            }
        }
        $countCancel = 0;
        $countCancelYesterday = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') === Carbon::parse($week)->format('Y-W')) {
                $countCancel++;
            }
            if (Carbon::parse($item->created_at)->format('Y-W') <= Carbon::parse($week)->subWeek()->format('Y-W')) {
                $countCancelYesterday++;
            }
        }
        // lấy ngày đầu tiên của tuần
        $firstDayOfWeek = Carbon::parse($week)->startOfWeek()->format('Y-m-d');
        // lấy ngày cuối cùng của tuần
        $lastDayOfWeek = Carbon::parse($week)->endOfWeek()->format('Y-m-d');
        $returnData = [
            'firstDayOfWeek' => $firstDayOfWeek,
            'lastDayOfWeek' => $lastDayOfWeek,
            'book' => $countBook,
            'cancel' => $countCancel,
            'since_book_yesterday' => tinhPhanTramTuHaiSo($countBook, $countBookYesterday),
            'since_cancel_yesterday' => tinhPhanTramTuHaiSo($countCancel, $countCancelYesterday),
        ];
        return $returnData;
    }

    public function monthly($request){
        $month = $request->month;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        $countBookYesterday = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') === Carbon::parse($month)->format('Y-m')) {
                $countBook++;
            }
            if (Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($month)->subMonth()->format('Y-m')) {
                $countBookYesterday++;
            }
        }
        $countCancel = 0;
        $countCancelYesterday = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') === Carbon::parse($month)->format('Y-m')) {
                $countCancel++;
            }
            if (Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($month)->subMonth()->format('Y-m')) {
                $countCancelYesterday++;
            }
        }
        // lấy ngày đầu tiên của tháng
        $firstDayOfMonth = Carbon::parse($month)->startOfMonth()->format('Y-m-d');
        // lấy ngày cuối cùng của tháng
        $lastDayOfMonth = Carbon::parse($month)->endOfMonth()->format('Y-m-d');
        $returnData = [
            'firstDayOfMonth' => $firstDayOfMonth,
            'lastDayOfMonth' => $lastDayOfMonth,
            'book' => $countBook,
            'cancel' => $countCancel,
            'since_book_yesterday' => tinhPhanTramTuHaiSo($countBook, $countBookYesterday),
            'since_cancel_yesterday' => tinhPhanTramTuHaiSo($countCancel, $countCancelYesterday),
        ];
        return $returnData;
    }

    public function yearly($request){
        $year = $request->year;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        $countBookYesterday = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y') === Carbon::parse($year)->format('Y')) {
                $countBook++;
            }
            if (Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($year)->subYear()->format('Y')) {
                $countBookYesterday++;
            }
        }
        $countCancel = 0;
        $countCancelYesterday = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y') === Carbon::parse($year)->format('Y')) {
                $countCancel++;
            }
            if (Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($year)->subYear()->format('Y')) {
                $countCancelYesterday++;
            }
        }
        // lấy ngày đầu tiên của năm
        $firstDayOfYear = Carbon::parse($year)->startOfYear()->format('Y-m-d');
        // lấy ngày cuối cùng của năm
        $lastDayOfYear = Carbon::parse($year)->endOfYear()->format('Y-m-d');
        $returnData = [
            'firstDayOfYear' => $firstDayOfYear,
            'lastDayOfYear' => $lastDayOfYear,
            'book' => $countBook,
            'cancel' => $countCancel,
            'since_book_yesterday' => tinhPhanTramTuHaiSo($countBook, $countBookYesterday),
            'since_cancel_yesterday' => tinhPhanTramTuHaiSo($countCancel, $countCancelYesterday),
        ];
        return $returnData;
    }

    public function day_to_day($request){
        $fromDay = $request->fromDay;
        $toDay = $request->toDay;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') >= Carbon::parse($fromDay)->format('Y-m-d') && Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($toDay)->format('Y-m-d')) {
                $countBook++;
            }
        }
        $countCancel = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m-d') >= Carbon::parse($fromDay)->format('Y-m-d') && Carbon::parse($item->created_at)->format('Y-m-d') <= Carbon::parse($toDay)->format('Y-m-d')) {
                $countCancel++;
            }
        }
        $returnData = [
            'fromDay' => $fromDay,
            'toDay' => $toDay,
            'book' => $countBook,
            'cancel' => $countCancel,
        ];
        return $returnData;
    }

    public function week_to_week($request){
        $fromWeek = $request->fromWeek;
        $toWeek = $request->toWeek;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') >= Carbon::parse($fromWeek)->format('Y-W') && Carbon::parse($item->created_at)->format('Y-W') <= Carbon::parse($toWeek)->format('Y-W')) {
                $countBook++;
            }
        }
        $countCancel = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-W') >= Carbon::parse($fromWeek)->format('Y-W') && Carbon::parse($item->created_at)->format('Y-W') <= Carbon::parse($toWeek)->format('Y-W')) {
                $countCancel++;
            }
        }
        // lấy ngày đầu tiên của tuần
        $firstDayOfWeek = Carbon::parse($fromWeek)->startOfWeek()->format('Y-m-d');
        // lấy ngày cuối cùng của tuần
        $lastDayOfWeek = Carbon::parse($toWeek)->endOfWeek()->format('Y-m-d');
        $returnData = [
            'firstDayOfWeek' => $firstDayOfWeek,
            'lastDayOfWeek' => $lastDayOfWeek,
            'fromWeek' => $fromWeek,
            'toWeek' => $toWeek,
            'book' => $countBook,
            'cancel' => $countCancel,
        ];
        return $returnData;
    }

    public function month_to_month($request){
        $fromMonth = $request->fromMonth;
        $toMonth = $request->toMonth;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') >= Carbon::parse($fromMonth)->format('Y-m') && Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($toMonth)->format('Y-m')) {
                $countBook++;
            }
        }
        $countCancel = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y-m') >= Carbon::parse($fromMonth)->format('Y-m') && Carbon::parse($item->created_at)->format('Y-m') <= Carbon::parse($toMonth)->format('Y-m')) {
                $countCancel++;
            }
        }
        // lấy ngày đầu tiên của tháng
        $firstDayOfMonth = Carbon::parse($fromMonth)->startOfMonth()->format('Y-m-d');
        // lấy ngày cuối cùng của tháng
        $lastDayOfMonth = Carbon::parse($toMonth)->endOfMonth()->format('Y-m-d');
        $returnData = [
            'firstDayOfMonth' => $firstDayOfMonth,
            'lastDayOfMonth' => $lastDayOfMonth,
            'fromMonth' => $fromMonth,
            'toMonth' => $toMonth,
            'book' => $countBook,
            'cancel' => $countCancel,
        ];
        return $returnData;
    }

    public function year_to_year($request){
        $fromYear = $request->fromYear;
        $toYear = $request->toYear;
        $book = $this->getDataBook($request);
        $cancel = $this->getDataCancel($request);
        $countBook = 0;
        foreach ($book as $item) {
            if (Carbon::parse($item->created_at)->format('Y') >= Carbon::parse($fromYear)->format('Y') && Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($toYear)->format('Y')) {
                $countBook++;
            }
        }
        $countCancel = 0;
        foreach ($cancel as $item) {
            if (Carbon::parse($item->created_at)->format('Y') >= Carbon::parse($fromYear)->format('Y') && Carbon::parse($item->created_at)->format('Y') <= Carbon::parse($toYear)->format('Y')) {
                $countCancel++;
            }
        }
        // lấy ngày đầu tiên của năm
        $firstDayOfYear = Carbon::parse($fromYear)->startOfYear()->format('Y-m-d');
        // lấy ngày cuối cùng của năm
        $lastDayOfYear = Carbon::parse($toYear)->endOfYear()->format('Y-m-d');
        $returnData = [
            'firstDayOfYear' => $firstDayOfYear,
            'lastDayOfYear' => $lastDayOfYear,
            'fromYear' => $fromYear,
            'toYear' => $toYear,
            'book' => $countBook,
            'cancel' => $countCancel,
        ];
        return $returnData;
    }
}
