<?php

namespace App\Console;

use App\Console\Commands\CreateNotification;
use App\Console\Commands\UpdateCheckOutBookDetail;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // UpdateCheckOutBookDetail::class,
        CreateNotification::class,
    ];
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('app:update-check-out-book-detail')->everyMinute();
        $schedule->command('app:create-notification')->everySecond();
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
