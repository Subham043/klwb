<?php

use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDateAllController;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDateCreateController;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDateExportController;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDatePaginateController;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDateUpdateController;
use App\Modules\ApplicationManagement\ApplicationDates\Controllers\ApplicationDateViewController;
use App\Modules\LocationManagement\Cities\Controllers\CityAllController;
use App\Modules\LocationManagement\Cities\Controllers\CityCreateController;
use App\Modules\LocationManagement\Cities\Controllers\CityDeleteController;
use App\Modules\LocationManagement\Cities\Controllers\CityExportController;
use App\Modules\LocationManagement\Cities\Controllers\CityPaginateController;
use App\Modules\LocationManagement\Cities\Controllers\CityUpdateController;
use App\Modules\LocationManagement\Cities\Controllers\CityViewController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesAllController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesCreateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesDeleteController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesExportController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesPaginateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesUpdateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesViewController;
use App\Modules\CourseManagement\Courses\Controllers\CourseAllController;
use App\Modules\CourseManagement\Courses\Controllers\CourseCreateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseDeleteController;
use App\Modules\CourseManagement\Courses\Controllers\CourseExportController;
use App\Modules\CourseManagement\Courses\Controllers\CoursePaginateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseUpdateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseViewController;
use App\Modules\Admins\Employees\Controllers\EmployeeCreateController;
use App\Modules\Admins\Employees\Controllers\EmployeeDeleteController;
use App\Modules\Admins\Employees\Controllers\EmployeeExportController;
use App\Modules\Admins\Employees\Controllers\EmployeePaginateController;
use App\Modules\Admins\Employees\Controllers\EmployeeUpdateController;
use App\Modules\Admins\Employees\Controllers\EmployeeViewController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeAllController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeCreateController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeDeleteController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeExportController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeePaginateController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeUpdateController;
use App\Modules\ApplicationManagement\Fees\Controllers\FeeViewController;
use App\Modules\LocationManagement\States\Controllers\StateAllController;
use App\Modules\LocationManagement\States\Controllers\StateCreateController;
use App\Modules\LocationManagement\States\Controllers\StateDeleteController;
use App\Modules\LocationManagement\States\Controllers\StatePaginateController;
use App\Modules\LocationManagement\States\Controllers\StateUpdateController;
use App\Modules\LocationManagement\States\Controllers\StateViewController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationAllController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationCreateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationDeleteController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationExportController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationPaginateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationUpdateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationViewController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteAllController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteCreateController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteDeleteController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteExportController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstitutePaginateController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteUpdateController;
use App\Modules\InstituteManagement\RegisteredInstitutes\Controllers\RegisteredInstituteViewController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteAllController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteDeleteController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteExportController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstitutePaginateController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteUpdateController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteViewController;
use App\Modules\Roles\Controllers\RoleAllController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionAllController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionCreateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionDeleteController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionExportController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionPaginateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionUpdateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionViewController;
use App\Modules\LocationManagement\States\Controllers\StateExportController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqAllController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqCreateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqDeleteController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqExportController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqPaginateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqUpdateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqViewController;
use App\Modules\Admins\Accounts\Controllers\PasswordUpdateController;
use App\Modules\Admins\Accounts\Controllers\ProfileController;
use App\Modules\Admins\Accounts\Controllers\ProfileUpdateController;
use App\Modules\Admins\Accounts\Controllers\ProfileVerifyController;
use App\Modules\Admins\Accounts\Controllers\ResendRegisteredUserOtpController;
use App\Modules\Admins\Authentication\Controllers\ForgotPasswordViaEmailController;
use App\Modules\Admins\Authentication\Controllers\EmailLoginController;
use App\Modules\Admins\Authentication\Controllers\ForgotPasswordViaPhoneController;
use App\Modules\Admins\Authentication\Controllers\LogoutController;
use App\Modules\Admins\Authentication\Controllers\PhoneLoginController;
use App\Modules\Admins\Authentication\Controllers\ResetPasswordController;
use App\Modules\Admins\Authentication\Controllers\ResetPasswordResendOtpController;
use App\Modules\InstituteManagement\Institutes\Controllers\NonRegisteredExportController;
use App\Modules\InstituteManagement\Institutes\Controllers\NonRegisteredPaginateController;
use App\Modules\InstituteManagement\Institutes\Controllers\NonRegisteredViewController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredAuthController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredExportController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredPaginateController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredToggleController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredUpdateController;
use App\Modules\InstituteManagement\Institutes\Controllers\RegisteredViewController;
use App\Modules\InstituteManagement\RequestInstitutes\Controllers\RequestInstituteApproveController;
use App\Modules\InstituteManagement\Staff\Controllers\StaffExportController;
use App\Modules\InstituteManagement\Staff\Controllers\StaffPaginateController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
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
        Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Super-Admin|Admin|Verification-Officer|Financial-Officer|Payment-Officer'])->group(function () {
            Route::prefix('roles')->group(function () {
                Route::get('/all', [RoleAllController::class, 'index']);
            });
            Route::prefix('employees')->group(function () {
                Route::get('/excel', [EmployeeExportController::class, 'index']);
                Route::get('/paginate', [EmployeePaginateController::class, 'index']);
                Route::post('/create', [EmployeeCreateController::class, 'index']);
                Route::post('/update/{id}', [EmployeeUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [EmployeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [EmployeeViewController::class, 'index']);
            });
            Route::prefix('states')->group(function () {
                Route::get('/excel', [StateExportController::class, 'index']);
                Route::get('/all', [StateAllController::class, 'index']);
                Route::get('/paginate', [StatePaginateController::class, 'index']);
                Route::post('/create', [StateCreateController::class, 'index']);
                Route::post('/update/{id}', [StateUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [StateDeleteController::class, 'index']);
                Route::get('/view/{id}', [StateViewController::class, 'index']);
            });
            Route::prefix('cities')->group(function () {
                Route::get('/excel', [CityExportController::class, 'index']);
                Route::get('/all', [CityAllController::class, 'index']);
                Route::get('/paginate', [CityPaginateController::class, 'index']);
                Route::post('/create', [CityCreateController::class, 'index']);
                Route::post('/update/{id}', [CityUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [CityDeleteController::class, 'index']);
                Route::get('/view/{id}', [CityViewController::class, 'index']);
            });
            Route::prefix('taluqs')->group(function () {
                Route::get('/excel', [TaluqExportController::class, 'index']);
                Route::get('/all', [TaluqAllController::class, 'index']);
                Route::get('/paginate', [TaluqPaginateController::class, 'index']);
                Route::post('/create', [TaluqCreateController::class, 'index']);
                Route::post('/update/{id}', [TaluqUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [TaluqDeleteController::class, 'index']);
                Route::get('/view/{id}', [TaluqViewController::class, 'index']);
            });
            Route::prefix('graduations')->group(function () {
                Route::get('/excel', [GraduationExportController::class, 'index']);
                Route::get('/all', [GraduationAllController::class, 'index']);
                Route::get('/paginate', [GraduationPaginateController::class, 'index']);
                Route::post('/create', [GraduationCreateController::class, 'index']);
                Route::post('/update/{id}', [GraduationUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [GraduationDeleteController::class, 'index']);
                Route::get('/view/{id}', [GraduationViewController::class, 'index']);
            });
            Route::prefix('courses')->group(function () {
                Route::get('/excel', [CourseExportController::class, 'index']);
                Route::get('/all', [CourseAllController::class, 'index']);
                Route::get('/paginate', [CoursePaginateController::class, 'index']);
                Route::post('/create', [CourseCreateController::class, 'index']);
                Route::post('/update/{id}', [CourseUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [CourseDeleteController::class, 'index']);
                Route::get('/view/{id}', [CourseViewController::class, 'index']);
            });
            Route::prefix('classes')->group(function () {
                Route::get('/excel', [ClassesExportController::class, 'index']);
                Route::get('/all', [ClassesAllController::class, 'index']);
                Route::get('/paginate', [ClassesPaginateController::class, 'index']);
                Route::post('/create', [ClassesCreateController::class, 'index']);
                Route::post('/update/{id}', [ClassesUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [ClassesDeleteController::class, 'index']);
                Route::get('/view/{id}', [ClassesViewController::class, 'index']);
            });
            Route::prefix('security-questions')->group(function () {
                Route::get('/excel', [SecurityQuestionExportController::class, 'index']);
                Route::get('/all', [SecurityQuestionAllController::class, 'index']);
                Route::get('/paginate', [SecurityQuestionPaginateController::class, 'index']);
                Route::post('/create', [SecurityQuestionCreateController::class, 'index']);
                Route::post('/update/{id}', [SecurityQuestionUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [SecurityQuestionDeleteController::class, 'index']);
                Route::get('/view/{id}', [SecurityQuestionViewController::class, 'index']);
            });
            Route::prefix('fees')->group(function () {
                Route::get('/excel', [FeeExportController::class, 'index']);
                Route::get('/all', [FeeAllController::class, 'index']);
                Route::get('/paginate', [FeePaginateController::class, 'index']);
                Route::post('/create', [FeeCreateController::class, 'index']);
                Route::post('/update/{id}', [FeeUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [FeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [FeeViewController::class, 'index']);
            });
            Route::prefix('application-dates')->group(function () {
                Route::get('/excel', [ApplicationDateExportController::class, 'index']);
                Route::get('/all', [ApplicationDateAllController::class, 'index']);
                Route::get('/paginate', [ApplicationDatePaginateController::class, 'index']);
                Route::post('/create', [ApplicationDateCreateController::class, 'index']);
                Route::post('/update/{id}', [ApplicationDateUpdateController::class, 'index']);
                // Route::delete('/delete/{id}', [ApplicationDateDeleteController::class, 'index']);
                Route::get('/view/{id}', [ApplicationDateViewController::class, 'index']);
            });
            Route::prefix('registered-institutes')->group(function () {
                Route::get('/excel', [RegisteredInstituteExportController::class, 'index']);
                Route::get('/all', [RegisteredInstituteAllController::class, 'index']);
                Route::get('/paginate', [RegisteredInstitutePaginateController::class, 'index']);
                Route::post('/create', [RegisteredInstituteCreateController::class, 'index']);
                Route::post('/update/{id}', [RegisteredInstituteUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [RegisteredInstituteDeleteController::class, 'index']);
                Route::get('/view/{id}', [RegisteredInstituteViewController::class, 'index']);
            });
            Route::prefix('request-institutes')->group(function () {
                Route::get('/excel', [RequestInstituteExportController::class, 'index']);
                Route::get('/all', [RequestInstituteAllController::class, 'index']);
                Route::get('/paginate', [RequestInstitutePaginateController::class, 'index']);
                Route::post('/update/{id}', [RequestInstituteUpdateController::class, 'index']);
                Route::post('/approve/{id}', [RequestInstituteApproveController::class, 'index']);
                Route::delete('/delete/{id}', [RequestInstituteDeleteController::class, 'index']);
                Route::get('/view/{id}', [RequestInstituteViewController::class, 'index']);
            });
            Route::prefix('institutes')->group(function () {
                Route::prefix('registered')->group(function () {
                    Route::get('/excel', [RegisteredExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredPaginateController::class, 'index']);
                    Route::get('/view/{id}', [RegisteredViewController::class, 'index']);
                    Route::post('/update/{id}', [RegisteredUpdateController::class, 'index']);
                    Route::post('/update-auth/{id}', [RegisteredAuthController::class, 'index']);
                    Route::get('/toggle-status/{id}', [RegisteredToggleController::class, 'index']);
                    Route::prefix('staff/{id}')->group(function () {
                        Route::get('/excel', [StaffExportController::class, 'index']);
                        Route::get('/paginate', [StaffPaginateController::class, 'index']);
                    });
                });
                Route::prefix('non-registered')->group(function () {
                    Route::get('/excel', [NonRegisteredExportController::class, 'index']);
                    Route::get('/paginate', [NonRegisteredPaginateController::class, 'index']);
                    Route::get('/view/{id}', [NonRegisteredViewController::class, 'index']);
                });
            });
        });
    });
});
