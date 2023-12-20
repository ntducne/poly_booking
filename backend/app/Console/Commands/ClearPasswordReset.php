<?php

namespace App\Console\Commands;

use App\Models\PasswordReset;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ClearPasswordReset extends Command
{
    private PasswordReset $password_reset;
    public function __construct()
    {
        parent::__construct();
        $this->password_reset = new PasswordReset();
    }
    protected $signature = 'app:clear-password-reset';
    protected $description = 'Command description';
    public function handle()
    {
        $password_reset = $this->password_reset->get();
        foreach ($password_reset as $item) {
            if (Carbon::parse($item->updated_at)->addMinutes(15)->isPast()) {
                $item->delete();
            }
        }
    }
}
