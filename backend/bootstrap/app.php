<?php

use App\Http\Middleware\HttpHeaders;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Console\Scheduling\Schedule;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: [
            __DIR__.'/../routes/api/admin.php',
            __DIR__.'/../routes/api/official.php',
            __DIR__.'/../routes/api/govt.php',
            __DIR__.'/../routes/api/industry.php',
            __DIR__.'/../routes/api/institute.php',
            __DIR__.'/../routes/api/finance.php',
            __DIR__.'/../routes/api.php',
        ],
        apiPrefix: 'api',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
        $middleware->statefulApi();
        $middleware->append(HttpHeaders::class);
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('telescope:prune')->daily();
    })
    ->withExceptions(function (Exceptions $exceptions) {

    })->create();
