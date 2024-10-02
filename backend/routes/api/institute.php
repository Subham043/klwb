<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteCreateController;
use App\Modules\Auth\Common\Controllers\PasswordUpdateController;
use App\Modules\Auth\Common\Controllers\ProfileController;
use App\Modules\Auth\Common\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Auth\Institute\Accounts\Controllers\AccountDocUpdateController;
use App\Modules\Auth\Institute\Accounts\Controllers\AccountInfoController;
use App\Modules\Auth\Institute\Accounts\Controllers\AccountInfoUpdateController;
use App\Modules\Auth\Institute\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Auth\Institute\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Auth\Institute\Authentication\Controllers\EmailLoginController;
use App\Modules\Auth\Institute\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Auth\Institute\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Auth\Institute\Authentication\Controllers\InstituteRegisterController;
use App\Modules\Auth\Institute\Authentication\Controllers\LogoutController;
use App\Modules\Auth\Institute\Authentication\Controllers\PhoneLoginController;
use App\Modules\Auth\Institute\Authentication\Controllers\ResetPasswordController;
use App\Modules\Auth\Institute\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\InstituteManagement\Dashboard\InstituteDashboardController;
use App\Modules\InstituteManagement\Scholarship\Controllers\InstituteScholarshipApproveController;
use App\Modules\InstituteManagement\Scholarship\Controllers\InstituteScholarshipListController;
use App\Modules\InstituteManagement\Scholarship\Controllers\InstituteScholarshipPdfController;
use App\Modules\InstituteManagement\Scholarship\Controllers\InstituteScholarshipRejectController;
use App\Modules\InstituteManagement\Scholarship\Controllers\InstituteScholarshipViewController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeCreateController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeDeleteController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeExportController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeePaginateController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeToggleController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeUpdateController;
use App\Modules\InstituteManagement\Staff\Controllers\InstituteEmployeeViewController;
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
                Route::middleware('verified')->get('/info', [AccountInfoController::class, 'index']);
                Route::middleware(['verified', 'role:Institute'])->post('/info-update', [AccountInfoUpdateController::class, 'index']);
                Route::middleware(['verified', 'role:Institute'])->post('/doc-update', [AccountDocUpdateController::class, 'index']);
                Route::post('/verify', [ProfileVerifyController::class, 'index']);
                Route::get('/resend-otp', [ResendRegisteredUserOtpController::class, 'index'])->middleware(['throttle:3,1']);
            });
        });
        Route::middleware([Guards::Institute->middleware(), 'verified', 'role:Institute'])->group(function () {
            Route::prefix('employees')->group(function () {
                Route::get('/excel', [InstituteEmployeeExportController::class, 'index']);
                Route::get('/paginate', [InstituteEmployeePaginateController::class, 'index']);
                Route::post('/create', [InstituteEmployeeCreateController::class, 'index']);
                Route::post('/update/{id}', [InstituteEmployeeUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [InstituteEmployeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [InstituteEmployeeViewController::class, 'index']);
                Route::get('/status/{id}', [InstituteEmployeeToggleController::class, 'index']);
            });
        });
        Route::middleware([Guards::Institute->middleware(), 'verified', 'role:Institute|Institute-Staff'])->group(function () {
            Route::prefix('scholarship')->group(function () {
                Route::get('/list', [InstituteScholarshipListController::class, 'index']);
                Route::get('/view/{id}', [InstituteScholarshipViewController::class, 'index']);
                Route::get('/pdf/{id}', [InstituteScholarshipPdfController::class, 'index']);
                Route::post('/approve/{id}', [InstituteScholarshipApproveController::class, 'index']);
                Route::post('/reject/{id}', [InstituteScholarshipRejectController::class, 'index']);
            });
            Route::get('/dashboard', [InstituteDashboardController::class, 'index']);
        });
    });
});
