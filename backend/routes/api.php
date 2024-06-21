<?php

use App\Modules\Accounts\Controllers\PasswordUpdateController;
use App\Modules\Accounts\Controllers\ProfileController;
use App\Modules\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Accounts\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Authentication\Controllers\EmailLoginController;
use App\Modules\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Authentication\Controllers\LogoutController;
use App\Modules\Authentication\Controllers\PhoneLoginController;
use App\Modules\Authentication\Controllers\StudentRegisterController;
use App\Modules\Authentication\Controllers\ResetPasswordViaEmailController;
use App\Modules\Authentication\Controllers\ResetPasswordViaPhoneController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login-via-email', [EmailLoginController::class, 'index']);
        Route::post('/login-via-phone', [PhoneLoginController::class, 'index']);
        Route::prefix('register')->group(function () {
            Route::post('/student', [StudentRegisterController::class, 'index']);
        });
        Route::post('/forgot-password-via-email', [ForgotPasswordViaEmailController::class, 'index']);
        Route::post('/forgot-password-via-phone', [ForgotPasswordViaPhoneController::class, 'index']);
        Route::post('/reset-password-via-email/{token}', [ResetPasswordViaEmailController::class, 'index']);
        Route::post('/reset-password-via-phone/{token}', [ResetPasswordViaPhoneController::class, 'index']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('/email/verify')->group(function () {
        });
        Route::get('/auth/logout', [LogoutController::class, 'index']);
        Route::prefix('account')->group(function () {
            Route::middleware('verified')->get('/', [ProfileController::class, 'index']);
            Route::middleware('verified')->post('/update', [ProfileUpdateController::class, 'index']);
            Route::middleware('verified')->post('/update-password', [PasswordUpdateController::class, 'index']);
            Route::post('/verify', [ProfileVerifyController::class, 'index']);
            Route::get('/resend-otp', [ResendRegisteredUserOtpController::class, 'index'])->middleware(['throttle:6,1']);
        });
    });
});