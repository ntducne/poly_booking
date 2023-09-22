<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
//class ResetPasswordRequest extends Notification
class ResetPasswordRequest extends Notification implements ShouldQueue
{
    use Queueable;
    protected $token;
    public function __construct($token)
    {
        $this->token = $token;
    }
    public function via($notifiable)
    {
        return ['mail'];
    }
    public function toMail($notifiable)
    {
        $url = env('FORGOT_PASSWORD_URL').$this->token;

        return (new MailMessage)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->line('You have 10 minutes to perform a password reset.')
            ->action('Reset Password', url($url))
            ->line('If you did not request a password reset, no further action is required.');
    }
}
