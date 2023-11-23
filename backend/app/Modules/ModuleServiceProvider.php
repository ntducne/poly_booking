<?php

namespace App\Modules;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

class ModuleServiceProvider extends  \Illuminate\Support\ServiceProvider
{
    /**
     * Bootstrap any application services.
     * @return void
     */
    public function boot()
    {
        $this->modules();
    }

    /**
     * Register any application services.
     * @created at 2019-11-06 04:32:56
     * @return void
     */
    public function register()
    {
    }

    /**
     * make module
     * @return void
     */
    private function modules()
    {
        $modules = array_map('basename', File::directories(__DIR__));
        foreach ($modules as $module) {
            if ($module == 'Api') {
                $namespace = "App\\Modules\\" . $module . "\Controllers";

                if (file_exists(__DIR__ . '/' . $module . '/routes.php')) {
                    $this->mapApiRoutes($namespace, __DIR__ . '/' . $module . '/routes.php');
                }
            } else {
                // $namespace = "App\\Modules\\" . $module . "\Controllers";
                $namespace = "";
                if (file_exists(__DIR__ . '/' . $module . '/routes.php')) {
                    $this->mapWebRoutes($namespace, __DIR__ . '/' . $module . '/routes.php');
                }
                if (is_dir(__DIR__ . '/' . $module . '/Views')) {
                    $this->loadViewsFrom(__DIR__ . '/' . $module . '/Views', $module);
                }
            }
        }
    }

    /**
     * get guard.
     *
     * @return void
     */
    protected function guard($guard)
    {
        return \Auth::guard($guard);
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes($namespace, $path_to_file)
    {
        Route::middleware('web')
            ->namespace($namespace)
            ->group($path_to_file);
    }
    /**
     * Define the "api" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapApiRoutes($namespace, $path_to_file)
    {
        Route::middleware('api')
            ->namespace($namespace)
            ->group($path_to_file);
    }
}
