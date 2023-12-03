<?php

namespace App\Console\Commands;

use App\Events\Message;
use Illuminate\Console\Command;

class CreateNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        event(new Message([
            'message' => 'Hello world' . time(),
            'time' => time(),
        ]));
    }
}
