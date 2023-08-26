<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserRegister extends Notification implements ShouldQueue
{
    use Queueable;

    private string $name;
    private string $password;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Đăng ký tài khoản thành công !')
            ->markdown('mail.register',[
                'name' => $this->name,
            ]);
    }
}
