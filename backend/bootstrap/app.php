<?php

use App\Http\Middleware\HttpHeaders;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: [
            __DIR__.'/../routes/api/admin.php',
            __DIR__.'/../routes/api/contribution.php',
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
        $middleware->statefulApi();
        $middleware->append(HttpHeaders::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {

    })->create();