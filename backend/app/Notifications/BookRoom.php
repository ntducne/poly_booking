<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookRoom extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public mixed $name,
        public mixed $info,
        public mixed $url
    ) {

        
    }
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Đặt phòng thành công !')
            ->markdown('mail.booking', [
                'name' => $this->name,
                'info' => $this->info,
                'url' => $this->url,
            ]);
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
