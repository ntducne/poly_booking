<?php

namespace App\Console;

use App\Console\Commands\ClearPasswordReset;
use App\Console\Commands\ReminderPayment;
use App\Console\Commands\UpdateCheckOutBookDetail;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        UpdateCheckOutBookDetail::class,
        ReminderPayment::class,
        ClearPasswordReset::class
    ];
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('app:update-check-out-book-detail')->hourly();
        $schedule->command('app:reminder-payment')->hourly();
        $schedule->command('app:clear-password-reset')->hourly();
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
