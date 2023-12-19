<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentSuccess extends Notification
{
    use Queueable;

    public function __construct(
        public mixed $name,
        public mixed $info,
    ) {

        
    }
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Thông báo thanh toán hoá đơn đặt phòng !')
            ->markdown('PaymentSuccess', [
                'name' => $this->name,
                'info' => $this->info,
            ]);
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
