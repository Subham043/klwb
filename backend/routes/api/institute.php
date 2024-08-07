<?php

use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Accounts\Controllers\PasswordUpdateController;
use App\Modules\InstituteManagement\Accounts\Controllers\ProfileController;
use App\Modules\InstituteManagement\Accounts\Controllers\ProfileUpdateController;
use App\Modules\InstituteManagement\Accounts\Controllers\ProfileVerifyController;
use App\Modules\InstituteManagement\Accounts\Controllers\ResendRegisteredUserOtpController;
use App\Modules\InstituteManagement\Authentication\Controllers\EmailLoginController;
use App\Modules\InstituteManagement\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\InstituteManagement\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\InstituteManagement\Authentication\Controllers\InstituteRegisterController;
use App\Modules\InstituteManagement\Authentication\Controllers\LogoutController;
use App\Modules\InstituteManagement\Authentication\Controllers\PhoneLoginController;
use App\Modules\InstituteManagement\Authentication\Controllers\ResetPasswordController;
use App\Modules\InstituteManagement\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteCreateController;
use Illuminate\Support\Facades\Route;

Route::prefix('institute')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/login-via-email', [EmailLoginController::class, 'index']);
            Route::post('/login-via-phone', [PhoneLoginController::class, 'index']);
            Route::prefix('register')->group(function () {
                Route::post('/institute', [InstituteRegisterController::class, 'index']);
            });
            Route::post('/forgot-password-via-email', [ForgotPasswordViaEmailController::class, 'index']);
            Route::post('/forgot-password-via-phone', [ForgotPasswordViaPhoneController::class, 'index']);
            Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->name('institute-reset-password');
            Route::get('/reset-password-resend-otp/{token}', [ResetPasswordResendOtpController::class, 'index'])->middleware(['throttle:3,1']);
            Route::prefix('request-institutes')->group(function () {
                Route::post('/create', [RequestInstituteCreateController::class, 'index']);
            });
        });
        Route::middleware([Guards::Institute->middleware(), 'role:Institute|Institute-Staff'])->group(function () {
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
