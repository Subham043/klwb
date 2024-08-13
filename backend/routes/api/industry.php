<?php

use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Accounts\Controllers\PasswordUpdateController;
use App\Modules\IndustryManagement\Accounts\Controllers\ProfileController;
use App\Modules\IndustryManagement\Accounts\Controllers\ProfileUpdateController;
use App\Modules\IndustryManagement\Accounts\Controllers\ProfileVerifyController;
use App\Modules\IndustryManagement\Accounts\Controllers\ResendRegisteredUserOtpController;
use App\Modules\IndustryManagement\Authentication\Controllers\EmailLoginController;
use App\Modules\IndustryManagement\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\IndustryManagement\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\IndustryManagement\Authentication\Controllers\IndustryRegisterController;
use App\Modules\IndustryManagement\Authentication\Controllers\LogoutController;
use App\Modules\IndustryManagement\Authentication\Controllers\PhoneLoginController;
use App\Modules\IndustryManagement\Authentication\Controllers\ResetPasswordController;
use App\Modules\IndustryManagement\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\IndustryManagement\RequestIndustry\Controllers\RequestIndustryCreateController;
use Illuminate\Support\Facades\Route;


Route::prefix('industry')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/login-via-email', [EmailLoginController::class, 'index']);
            Route::post('/login-via-phone', [PhoneLoginController::class, 'index']);
            Route::prefix('register')->group(function () {
                Route::post('/industry', [IndustryRegisterController::class, 'index']);
            });
            Route::post('/forgot-password-via-email', [ForgotPasswordViaEmailController::class, 'index']);
            Route::post('/forgot-password-via-phone', [ForgotPasswordViaPhoneController::class, 'index']);
            Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->name('industry-reset-password');
            Route::get('/reset-password-resend-otp/{token}', [ResetPasswordResendOtpController::class, 'index'])->middleware(['throttle:3,1']);
            Route::prefix('request-industries')->group(function () {
                Route::post('/create', [RequestIndustryCreateController::class, 'index']);
            });
        });
        Route::middleware([Guards::Industry->middleware(), 'role:Industry|Industry-Staff'])->group(function () {
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
