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

    public function daily_revenue_statistics($request)
    {
        // lấy ngày gửi lên
        $day = $request->day;
        if (Carbon::parse($day)->gt(Carbon::parse(Carbon::now()))) {
            return response()->json([
                'message' => 'Ngày thống kê không được lớn hơn ngày hiện tại !'
            ]);
        }
        else {
            $total = 0;
            $sinceTotal = 0;
            $data = $this->billing->whereIn('status', array_map(function ($item) { return (int)$item; }, $request->status))->get();
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
    }

    public function day_to_day_revenue_statistics($request)
    {
        // lấy ngày gửi lên
        $startDay = $request->startDay;
        $endDay = $request->endDay;
        if (Carbon::parse($endDay)->gt(Carbon::parse(Carbon::now()))) {
            return response()->json([
                'message' => 'Ngày thống kê không được lớn hơn ngày hiện tại !'
            ]);
        } else {
            $data = $this->billing
                ->whereIn('status', array_map(function ($item) {
                    return (int)$item;
                }, $request->status))->whereBetween('created_at', [Carbon::parse($startDay)->startOfDay(), Carbon::parse($endDay)->endOfDay()])->get();
            $newData = [];
            foreach ($data as $item) {
                $newData[] = [
                    'days' => Carbon::parse($item->created_at)->format('d/m/Y'),
                    'total' => $data->where('created_at', '>=', Carbon::parse($item->created_at)->startOfDay())
                        ->where('created_at', '<=', Carbon::parse($item->created_at)->endOfDay())
                        ->sum('total')
                ];
            }
            return $newData;
        }
    }

    public function weekly_revenue_statistics($request)
    {
        $day = $request->day;
        // lấy ngày đầu tiên và ngày kết thúc tuần
        $startWeek = Carbon::parse($day)->startOfWeek();
        $endWeek = Carbon::parse($day)->endOfWeek();
        // lấy dữ liệu trong tuần
        $data = $this->billing->whereIn('status', array_map(function ($item) {
            return (int)$item;
        }, $request->status))->whereBetween('created_at', [$startWeek, $endWeek])->get();
        $newData = [];
        foreach ($data as $item) {
            $newData[Carbon::parse($item->created_at)->dayOfWeek]['days'] = Carbon::parse($item->created_at)->format('d/m/Y');
            $newData[Carbon::parse($item->created_at)->dayOfWeek]['total'] = $data->where('created_at', '>=', Carbon::parse($item->created_at)->startOfDay())
                ->where('created_at', '<=', Carbon::parse($item->created_at)->endOfDay())
                ->sum('total');
        }
        return $newData;
    }

    public function week_to_week_revenue_statistics($request)
    {
        $startDay = $request->startDay;
        $endDay = $request->endDay;
        // lấy ngày đầu tiên và ngày kết thúc tuần
        $startWeek = Carbon::parse($startDay)->startOfWeek();
        $endWeek = Carbon::parse($endDay)->endOfWeek();
        // lấy dữ liệu trong tuần
        $data = $this->billing
            ->whereIn('status', array_map(function ($item) {
                return (int)$item;
            }, $request->status))->whereBetween('created_at', [$startWeek, $endWeek])->get();
        $newData = [];
        foreach ($data as $item) {
            $newData[Carbon::parse($item->created_at)->dayOfWeek]['days'] = Carbon::parse($item->created_at)->format('d/m/Y');
            $newData[Carbon::parse($item->created_at)->dayOfWeek]['total'] = $data->where('created_at', '>=', Carbon::parse($item->created_at)->startOfDay())
                ->where('created_at', '<=', Carbon::parse($item->created_at)->endOfDay())
                ->sum('total');
        }
        return $newData;
    }

    public function monthly_revenue_statistics($request)
    {
        $month = $request->month;
        $data = $this->billing
            ->whereIn('status', array_map(function ($item) {
                return (int)$item;
            }, $request->status))->whereBetween('created_at', [Carbon::parse($month)->startOfMonth(), Carbon::parse($month)->endOfMonth()])->get();
        $total = $data->sum('total');
        return [
            'month' => $month,
            'total' => $total
        ];
    }

    public function month_to_month_revenue_statistics($request)
    {
        $fromMonth = $request->fromMonth;
        $toMonth = $request->toMonth;
        $startDate = Carbon::parse($fromMonth)->startOfMonth();
        $endDate = Carbon::parse($toMonth)->endOfMonth();
        $data = $this->billing
            ->whereIn('status', array_map(function ($item) {
                return (int)$item;
            }, $request->status))->whereBetween('created_at', [$startDate, $endDate])->get();
        $groupedData = [];
        foreach ($data as $item) {
            $month = Carbon::parse($item->created_at)->format('m/Y');
            $currentMonthTotal = 0;
            foreach ($data as $dataItem) {
                if (Carbon::parse($dataItem->created_at)->format('m/Y') === $month) {
                    $currentMonthTotal += $dataItem->total;
                }
            }
            $groupedData[$month] = $currentMonthTotal;
        }
        return $groupedData;
    }

    public function yearly_revenue_statistics($request)
    {
        $year = $request->year;
        $data = $this->billing
            ->whereIn('status', array_map(function ($item) {
                return (int)$item;
            }, $request->status))->get();
        $groupedData = [];
        $currentYearTotal = 0;
        foreach ($data as $dataItem) {
            if (Carbon::parse($dataItem->created_at)->format('Y') === $year) {
                $currentYearTotal += $dataItem->total;
            }
        }
        $groupedData[$year] = $currentYearTotal;
        return $groupedData;
    }


    public function year_to_year_revenue_statistics($request)
    {
        $fromYear = $request->fromYear;
        $toYear = $request->toYear;
        $data = $this->billing->whereIn('status', array_map(function ($item) {
            return (int)$item;
        }, $request->status))->get();
        $groupedData = [];
        $currentYearTotal = 0;
        foreach ($data as $dataItem) {
            if (Carbon::parse($dataItem->created_at)->format('Y') >= $fromYear && Carbon::parse($dataItem->created_at)->format('Y') <= $toYear) {
                $currentYearTotal += $dataItem->total;
            }
        }
        $groupedData[$fromYear . '-' . $toYear] = $currentYearTotal;
        return $groupedData;
    }
}
