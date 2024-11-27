<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryCreateController;
use App\Modules\Auth\Common\Controllers\PasswordUpdateController;
use App\Modules\Auth\Common\Controllers\ProfileController;
use App\Modules\Auth\Common\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Auth\Industry\Accounts\Controllers\AccountDocUpdateController;
use App\Modules\Auth\Industry\Accounts\Controllers\AccountInfoController;
use App\Modules\Auth\Industry\Accounts\Controllers\AccountInfoUpdateController;
use App\Modules\Auth\Industry\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Auth\Industry\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Auth\Industry\Authentication\Controllers\EmailLoginController;
use App\Modules\Auth\Industry\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Auth\Industry\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Auth\Industry\Authentication\Controllers\IndustryRegisterController;
use App\Modules\Auth\Industry\Authentication\Controllers\LogoutController;
use App\Modules\Auth\Industry\Authentication\Controllers\PhoneLoginController;
use App\Modules\Auth\Industry\Authentication\Controllers\ResetPasswordController;
use App\Modules\Auth\Industry\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\IndustryManagement\Dashboard\IndustryDashboardController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentExportController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentFormDPdfController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentListController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentPaidYearController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentRecieptPdfController;
use App\Modules\IndustryManagement\Payment\Controllers\PaymentViewController;
use App\Modules\IndustryManagement\Scholarship\Controllers\IndustryScholarshipApproveController;
use App\Modules\IndustryManagement\Scholarship\Controllers\IndustryScholarshipListController;
use App\Modules\IndustryManagement\Scholarship\Controllers\IndustryScholarshipPdfController;
use App\Modules\IndustryManagement\Scholarship\Controllers\IndustryScholarshipRejectController;
use App\Modules\IndustryManagement\Scholarship\Controllers\IndustryScholarshipViewController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeCreateController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeDeleteController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeExportController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeePaginateController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeToggleController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeUpdateController;
use App\Modules\IndustryManagement\Staff\Controllers\IndustryEmployeeViewController;
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
                Route::middleware('verified')->get('/info', [AccountInfoController::class, 'index']);
                Route::middleware(['verified', 'role:Industry'])->post('/info-update', [AccountInfoUpdateController::class, 'index']);
                Route::middleware(['verified', 'role:Industry'])->post('/doc-update', [AccountDocUpdateController::class, 'index']);
                Route::post('/verify', [ProfileVerifyController::class, 'index']);
                Route::get('/resend-otp', [ResendRegisteredUserOtpController::class, 'index'])->middleware(['throttle:3,1']);
            });
        });
        Route::middleware([Guards::Industry->middleware(), 'verified', 'role:Industry'])->group(function () {
            Route::prefix('employees')->group(function () {
                Route::get('/excel', [IndustryEmployeeExportController::class, 'index']);
                Route::get('/paginate', [IndustryEmployeePaginateController::class, 'index']);
                Route::post('/create', [IndustryEmployeeCreateController::class, 'index']);
                Route::post('/update/{id}', [IndustryEmployeeUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [IndustryEmployeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [IndustryEmployeeViewController::class, 'index']);
                Route::get('/status/{id}', [IndustryEmployeeToggleController::class, 'index']);
            });
            Route::prefix('payments')->group(function () {
                Route::get('/excel', [PaymentExportController::class, 'index']);
                Route::get('/paginate', [PaymentListController::class, 'index']);
                Route::get('/paid-years', [PaymentPaidYearController::class, 'index']);
                Route::get('/view/{id}', [PaymentViewController::class, 'index']);
                Route::get('/reciept/{id}', [PaymentRecieptPdfController::class, 'index']);
                Route::get('/form-d/{id}', [PaymentFormDPdfController::class, 'index']);
            });
        });
        Route::middleware([Guards::Industry->middleware(), 'verified', 'role:Industry|Industry-Staff'])->group(function () {
            Route::prefix('scholarship')->group(function () {
                Route::get('/list', [IndustryScholarshipListController::class, 'index']);
                Route::get('/view/{id}', [IndustryScholarshipViewController::class, 'index']);
                Route::post('/approve/{id}', [IndustryScholarshipApproveController::class, 'index']);
                Route::post('/reject/{id}', [IndustryScholarshipRejectController::class, 'index']);
                Route::get('/pdf/{id}', [IndustryScholarshipPdfController::class, 'index']);
            });
            Route::get('/dashboard', [IndustryDashboardController::class, 'index']);
        });
    });
});
