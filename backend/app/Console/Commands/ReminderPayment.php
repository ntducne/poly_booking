<?php

namespace App\Console\Commands;

use App\Models\Billing;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Console\Command;

class ReminderPayment extends Command
{
    private Billing $billing;
    private User $user;
    private Booking $booking;

    public function __construct()
    {
        parent::__construct();
        $this->billing = new Billing();
        $this->user = new User();
        $this->booking = new Booking();
    }

    protected $signature = 'app:reminder-payment';

    protected $description = 'Reminder Payment';

    public function handle()
    {
        $billing = $this->billing->where('status', 0)->where('payment_method', '!=', 'cash')->get();
        foreach ($billing as $item) {
            $booking = $this->booking->where('_id', $item->booking_id)->first();
            if (
                $item->created_at < now()->subHour(2)->format('Y-m-d H:i:s')
            ) {
                $url = '';
                if($item->payment_method == 'vnpay'){
                    $url = route('vnpay.process', [
                        'order_code' => $item->billingCode,
                        'amount' => $item->total
                    ]);
                }

                if($item->payment_method == 'momo'){
                    $url = route('momo.process', [
                        'order_code' => $item->billingCode,
                        'amount' => $item->total
                    ]);
                }

                if($item->payment_method == 'paypal'){
                    $url = route('paypal.process', [
                        'order_code' => $item->billingCode,
                        'amount' => $item->total
                    ]);
                }

                if($item->user_id !== null){
                    $user = $this->user->where('_id', $item->user_id)->first();
                    if($user !== null){
                        $user->notify(new ReminderPayment(
                            $item->name,
                            [
                                'billing_code' => $item->billingCode,
                                'checkin' => $booking->checkin,
                                'checkout' => $booking->checkout,
                                'total' => $item->total
                            ],
                            $url
                        ));
                    }
                }
            } 
        }
        
    }
}
