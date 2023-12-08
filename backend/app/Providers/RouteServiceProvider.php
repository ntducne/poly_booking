<?php

namespace App\Providers;

use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckReferer;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::domain('pay.' . env('APP_DOMAIN'))
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/pay.php'));

            Route::prefix('permission')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/permission.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));

            Route::domain('client.' . env('APP_DOMAIN'))
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/client.php'));

            Route::domain('auth.' . env('APP_DOMAIN'))
                ->prefix('{slug}')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/auth.php'));

            Route::domain('api.' . env('APP_DOMAIN'))
                ->as('admin.')
                ->middleware(['api','auth:admin-api','scopes:admin'])
                ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));

            Route::domain('user.' . env('APP_DOMAIN'))
                ->middleware(['api','auth:user-api','scopes:user'])
                ->namespace($this->namespace)
                ->group(base_path('routes/user.php'));

        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
