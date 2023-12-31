<?php

namespace App\Repositories\Stats;

use App\Models\Billing;
use App\Models\User;
use Carbon\Carbon;

class Chart
{
    protected $billing;
    public function __construct()
    {
        $this->billing = new Billing();
    }

    public function yearly($request)
{
    $year = $request->input('year', date('Y'));
    $arrData = [];
    $booking = [];
    $cancel = [];
    $user = [];

    for ($i = 1; $i <= 12; $i++) {
        $billing = $this->billing
            ->where('status', 4)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $i)
            ->get();

        $arrData[] = $billing->sum('total');

        $booking[] = $this->billing
            ->whereIn('status', [3, 4])
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $i)
            ->count();

        $cancel[] = $this->billing
            ->whereIn('status', [2, 6])
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $i)
            ->count();

        $user[] = User::where('status', 0)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $i)
            ->count();
    }

    return [
        'revenue' => $arrData,
        'booking' => $booking,
        'cancel'  => $cancel,
        'user'    => $user
    ];
}

}