<?php

use App\Http\Enums\Guards;
use App\Modules\Auth\Common\Controllers\PasswordUpdateController;
use App\Modules\Auth\Common\Controllers\ProfileController;
use App\Modules\Auth\Common\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Auth\Official\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Auth\Official\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Auth\Official\Authentication\Controllers\EmailLoginController;
use App\Modules\Auth\Official\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Auth\Official\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Auth\Official\Authentication\Controllers\LogoutController;
use App\Modules\Auth\Official\Authentication\Controllers\PhoneLoginController;
use App\Modules\Auth\Official\Authentication\Controllers\ResetPasswordController;
use App\Modules\Auth\Official\Authentication\Controllers\ResetPasswordResendOtpController;
use Illuminate\Support\Facades\Route;

Route::prefix('official')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/login-via-email', [EmailLoginController::class, 'index']);
            Route::post('/login-via-phone', [PhoneLoginController::class, 'index']);
            Route::post('/forgot-password-via-email', [ForgotPasswordViaEmailController::class, 'index']);
            Route::post('/forgot-password-via-phone', [ForgotPasswordViaPhoneController::class, 'index']);
            Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->name('admin-reset-password');
            Route::get('/reset-password-resend-otp/{token}', [ResetPasswordResendOtpController::class, 'index'])->middleware(['throttle:3,1']);
        });
        Route::middleware([Guards::Admin->middleware(), 'role:Super-Admin|Admin|Verification-Officer|Financial-Officer|Payment-Officer'])->group(function () {
            Route::get('/auth/logout', [LogoutController::class, 'index']);
            Route::prefix('account')->group(function () {
                Route::get('/', [ProfileController::class, 'index']);
                Route::middleware('verified')->post('/update', [ProfileUpdateController::class, 'index']);
                Route::middleware('verified')->post('/update-password', [PasswordUpdateController::class, 'index']);
                Route::post('/verify', [ProfileVerifyController::class, 'index']);
                Route::get('/resend-otp', [ResendRegisteredUserOtpController::class, 'index'])->middleware(['throttle:3,1']);
            });
        });
    });
});
