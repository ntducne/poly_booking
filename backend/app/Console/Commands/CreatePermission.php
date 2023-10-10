<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreatePermission extends Command
{
    protected $signature = 'app:create-permission';

    protected $description = 'Create Permission';

    public function handle(): void
    {
        create_permision();
    }
}
