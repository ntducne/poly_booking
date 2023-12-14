<?php

namespace App\Repositories\Stats;

use App\Models\Billing;
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
        $year = $request->year ?? date('Y');

        $arrData = [];
        for($i = 1; $i <= 12; $i++){
            $billing = $this->billing->where('status', 1)->whereYear('created_at', $year)->get();
            foreach($billing as $bill){
                if(Carbon::parse($bill->created_at)->format('Y-m') == Carbon::parse($year.'-'.$i)->format('Y-m')){
                    $arrData[] = $bill->total;
                }
                else{
                    $arrData[] = 0;
                }
            }
                
        }
        return $arrData;
    }
}