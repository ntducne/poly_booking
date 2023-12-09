<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReminderPayment extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    public mixed $name;
    public mixed $info;
    public mixed $payment_url;

    public function __construct($name, $info, $payment_url)
    {
        $this->name = $name;
        $this->info = $info;
        $this->payment_url = $payment_url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Thông báo thanh toán hoá đơn đặt phòng !')
            ->markdown('mail.reminderPayment', [
                'name' => $this->name,
                'info' => $this->info,
                'payment_url' => $this->payment_url,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
