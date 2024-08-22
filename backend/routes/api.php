<?php

use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\Applications\Controllers\ApplyScholarshipController;
use App\Modules\ApplicationManagement\Applications\Controllers\ResubmitScholarshipController;
use App\Modules\ApplicationManagement\Applications\Controllers\ScholarshipListController;
use App\Modules\ApplicationManagement\Applications\Controllers\ScholarshipStatusController;
use App\Modules\ApplicationManagement\Applications\Controllers\ScholarshipViewController;
use App\Modules\Students\Accounts\Controllers\PasswordUpdateController;
use App\Modules\Students\Accounts\Controllers\ProfileController;
use App\Modules\Students\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Students\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Students\Accounts\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Students\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Students\Authentication\Controllers\EmailLoginController;
use App\Modules\Students\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Students\Authentication\Controllers\LogoutController;
use App\Modules\Students\Authentication\Controllers\PhoneLoginController;
use App\Modules\Students\Authentication\Controllers\StudentRegisterController;
use App\Modules\Students\Authentication\Controllers\ResetPasswordController;
use App\Modules\Students\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\LocationManagement\Cities\Controllers\CityAllController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesAllController;
use App\Modules\CourseManagement\Courses\Controllers\CourseAllController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationAllController;
use App\Modules\IndustryManagement\RegisteredIndustry\Controllers\RegisteredIndustryAllController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteAllController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqAllController;
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
    Route::prefix('registered-institutes')->group(function () {
        Route::get('/all', [RegisteredInstituteAllController::class, 'index']);
    });
    Route::prefix('registered-industries')->group(function () {
        Route::get('/all', [RegisteredIndustryAllController::class, 'index']);
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
    });
});
