<?php

use App\Modules\Accounts\Controllers\PasswordUpdateController;
use App\Modules\Accounts\Controllers\ProfileController;
use App\Modules\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Authentication\Controllers\ForgotPasswordController;
use App\Modules\Authentication\Controllers\LoginController;
use App\Modules\Authentication\Controllers\LogoutController;
use App\Modules\Authentication\Controllers\RegisterController;
use App\Modules\Authentication\Controllers\ResetPasswordController;
use App\Modules\Authentication\Controllers\VerifyRegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [LoginController::class, 'index']);
        Route::post('/register', [RegisterController::class, 'index']);
        Route::post('/forgot-password', [ForgotPasswordController::class, 'index']);
        Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('/email/verify')->group(function () {
            Route::post('/resend-notification', [VerifyRegisteredUserController::class, 'resend_notification'])->middleware(['throttle:6,1']);
        });
        Route::get('/auth/logout', [LogoutController::class, 'index']);
        Route::prefix('account')->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::post('/update', [ProfileUpdateController::class, 'index']);
            Route::post('/update-password', [PasswordUpdateController::class, 'index']);
        });
    });
});
