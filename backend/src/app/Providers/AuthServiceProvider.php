<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerPolicies();

        if(!$this->app->routesAreCached()){
            Passport::ignoreRoutes();
        }

        Passport::ignoreMigrations();
        Passport::tokensExpireIn(now()->addMinutes());
        Passport::refreshTokensExpireIn(now()->addMinutes(60));
        Passport::personalAccessTokensExpireIn(now()->addMinutes(1));

        Passport::tokensCan([
            'user'  => 'For User',
            'admin' => 'For Admin',
        ]);

    }
}
