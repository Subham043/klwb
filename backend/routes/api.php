<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\Industries\Controllers\IndustryAllController;
use App\Modules\Admins\Institutes\Controllers\InstituteAllController;
use App\Modules\Auth\Common\Controllers\PasswordUpdateController;
use App\Modules\Auth\Common\Controllers\ProfileController;
use App\Modules\Auth\Common\Controllers\ProfileUpdateController;
use App\Modules\Auth\Common\Controllers\ProfileVerifyController;
use App\Modules\Auth\Common\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Auth\Student\Authentication\Controllers\EmailLoginController;
use App\Modules\Auth\Student\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Auth\Student\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Auth\Student\Authentication\Controllers\LogoutController;
use App\Modules\Auth\Student\Authentication\Controllers\PhoneLoginController;
use App\Modules\Auth\Student\Authentication\Controllers\ResetPasswordController;
use App\Modules\Auth\Student\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\Auth\Student\Authentication\Controllers\StudentRegisterController;
use App\Modules\LocationManagement\Cities\Controllers\CityAllController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesAllController;
use App\Modules\CourseManagement\Courses\Controllers\CourseAllController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationAllController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqAllController;
use App\Modules\Students\Dashboard\StudentDashboardController;
use App\Modules\Students\Scholarship\Controllers\ApplyScholarshipController;
use App\Modules\Students\Scholarship\Controllers\ResubmitScholarshipController;
use App\Modules\Students\Scholarship\Controllers\ScholarshipListController;
use App\Modules\Students\Scholarship\Controllers\ScholarshipStatusController;
use App\Modules\Students\Scholarship\Controllers\ScholarshipViewController;
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
        Route::post('/reset-password/{token}', [ResetPasswordController::class, 'index'])->name('reset-password');
        Route::get('/reset-password-resend-otp/{token}', [ResetPasswordResendOtpController::class, 'index'])->middleware(['throttle:3,1']);
    });

    Route::prefix('cities')->group(function () {
        Route::get('/all', [CityAllController::class, 'index']);
    });
    Route::prefix('taluqs')->group(function () {
        Route::get('/all', [TaluqAllController::class, 'index']);
    });
    Route::prefix('graduations')->group(function () {
        Route::get('/all', [GraduationAllController::class, 'index']);
    });
    Route::prefix('courses')->group(function () {
        Route::get('/all', [CourseAllController::class, 'index']);
    });
    Route::prefix('classes')->group(function () {
        Route::get('/all', [ClassesAllController::class, 'index']);
    });
    Route::prefix('institutes')->group(function () {
        Route::get('/all', [InstituteAllController::class, 'index']);
    });
    Route::prefix('industries')->group(function () {
        Route::get('/all', [IndustryAllController::class, 'index']);
    });

    Route::middleware([Guards::Web->middleware(), 'role:Student'])->group(function () {
        Route::get('/auth/logout', [LogoutController::class, 'index']);
        Route::prefix('account')->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::middleware('verified')->post('/update', [ProfileUpdateController::class, 'index']);
            Route::middleware('verified')->post('/update-password', [PasswordUpdateController::class, 'index']);
            Route::post('/verify', [ProfileVerifyController::class, 'index']);
            Route::get('/resend-otp', [ResendRegisteredUserOtpController::class, 'index'])->middleware(['throttle:3,1']);
        });
    });
    Route::middleware([Guards::Web->middleware(), 'verified', 'role:Student'])->group(function () {
        Route::prefix('scholarship')->group(function () {
            Route::post('/apply', [ApplyScholarshipController::class, 'index']);
            Route::post('/resubmit', [ResubmitScholarshipController::class, 'index']);
            Route::get('/status', [ScholarshipStatusController::class, 'index']);
            Route::get('/list', [ScholarshipListController::class, 'index']);
            Route::get('/view/{id}', [ScholarshipViewController::class, 'index']);
        });
        Route::get('/dashboard', [StudentDashboardController::class, 'index']);
    });
});
