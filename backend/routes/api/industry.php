<?php

use App\Modules\IndustryManagement\RequestIndustry\Controllers\RequestIndustryCreateController;
use Illuminate\Support\Facades\Route;


Route::prefix('industry')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::prefix('request-industries')->group(function () {
                Route::post('/create', [RequestIndustryCreateController::class, 'index']);
            });
        });
    });
});
