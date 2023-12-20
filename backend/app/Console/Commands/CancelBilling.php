<?php

namespace App\Console\Commands;

use App\Models\Billing;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use Illuminate\Console\Command;

class CancelBilling extends Command
{
    private Billing $billing;
    private Booking $booking;
    private HistoryHandleBooking $handle;
    public function __construct()
    {
        parent::__construct();
        $this->billing = new Billing();
        $this->booking = new Booking();
        $this->handle = new HistoryHandleBooking();
    }
    protected $signature = 'app:cancel-billing';
    protected $description = 'Command description';
    public function handle()
    {
        $billing = $this->billing->where('status', 1)->get();
        foreach ($billing as $item){
            $booking = $this->booking->find($item->booking_id);
            if($booking->checkin < date('Y-m-d H:i:s')){
                $item->status = 2;
                $item->save();
                $this->handle->create([
                    'booking_id' => $item->booking_id,
                    'admin_id' => 1,
                    'handle' => 'Huỷ đặt phòng do khách hàng không đến nhận phòng',
                    'time' => date('Y-m-d H:i:s'),
                ]);
            }
        }
    }
}
