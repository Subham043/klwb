<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateAllController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateCreateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateExportController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDatePaginateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateUpdateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateViewController;
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
use App\Modules\Admins\Fees\Controllers\FeeAllController;
use App\Modules\Admins\Fees\Controllers\FeeCreateController;
use App\Modules\Admins\Fees\Controllers\FeeDeleteController;
use App\Modules\Admins\Fees\Controllers\FeeExportController;
use App\Modules\Admins\Fees\Controllers\FeePaginateController;
use App\Modules\Admins\Fees\Controllers\FeeUpdateController;
use App\Modules\Admins\Fees\Controllers\FeeViewController;
use App\Modules\Admins\Industries\Controllers\IndustryAllController;
use App\Modules\Admins\Industries\Controllers\IndustryCreateController;
use App\Modules\Admins\Industries\Controllers\IndustryDeleteController;
use App\Modules\Admins\Industries\Controllers\IndustryExportController;
use App\Modules\Admins\Industries\Controllers\IndustryPaginateController;
use App\Modules\Admins\Industries\Controllers\IndustryUpdateController;
use App\Modules\Admins\Industries\Controllers\IndustryViewController;
use App\Modules\Admins\Institutes\Controllers\InstituteAllController;
use App\Modules\Admins\Institutes\Controllers\InstituteCreateController;
use App\Modules\Admins\Institutes\Controllers\InstituteDeleteController;
use App\Modules\Admins\Institutes\Controllers\InstituteExportController;
use App\Modules\Admins\Institutes\Controllers\InstitutePaginateController;
use App\Modules\Admins\Institutes\Controllers\InstituteUpdateController;
use App\Modules\Admins\Institutes\Controllers\InstituteViewController;
use App\Modules\Admins\NonRegisteredIndustry\Controllers\NonRegisteredIndustryExportController;
use App\Modules\Admins\NonRegisteredIndustry\Controllers\NonRegisteredIndustryPaginateController;
use App\Modules\Admins\NonRegisteredIndustry\Controllers\NonRegisteredIndustryViewController;
use App\Modules\Admins\NonRegisteredInstitute\Controllers\NonRegisteredInstituteExportController;
use App\Modules\Admins\NonRegisteredInstitute\Controllers\NonRegisteredInstitutePaginateController;
use App\Modules\Admins\NonRegisteredInstitute\Controllers\NonRegisteredInstituteViewController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryAuthController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryExportController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryPaginateController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryToggleController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryUpdateController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryViewController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffExportController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryAllController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryApproveController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryDeleteController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryExportController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryPaginateController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryUpdateController;
use App\Modules\Admins\RequestIndustry\Controllers\RequestIndustryViewController;
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
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffPaginateController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteAuthController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteExportController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstitutePaginateController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteToggleController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteUpdateController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteViewController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffPaginateController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteAllController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteApproveController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteDeleteController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteExportController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstitutePaginateController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteUpdateController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteViewController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionAllController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionCreateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionDeleteController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionExportController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionPaginateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionUpdateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionViewController;
use App\Modules\InstituteManagement\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffExportController;
use App\Modules\Roles\Controllers\RoleAllController;
use App\Modules\LocationManagement\States\Controllers\StateExportController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqAllController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqCreateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqDeleteController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqExportController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqPaginateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqUpdateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqViewController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Super-Admin|Admin'])->group(function () {
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
            Route::prefix('institutes')->group(function () {
                Route::get('/excel', [InstituteExportController::class, 'index']);
                Route::get('/all', [InstituteAllController::class, 'index']);
                Route::get('/paginate', [InstitutePaginateController::class, 'index']);
                Route::post('/create', [InstituteCreateController::class, 'index']);
                Route::post('/update/{id}', [InstituteUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [InstituteDeleteController::class, 'index']);
                Route::get('/view/{id}', [InstituteViewController::class, 'index']);
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
            Route::prefix('registered-institutes')->group(function () {
                Route::get('/excel', [RegisteredInstituteExportController::class, 'index']);
                Route::get('/paginate', [RegisteredInstitutePaginateController::class, 'index']);
                Route::get('/view/{id}', [RegisteredInstituteViewController::class, 'index']);
                Route::post('/update/{id}', [RegisteredInstituteUpdateController::class, 'index']);
                Route::post('/update-auth/{id}', [RegisteredInstituteAuthController::class, 'index']);
                Route::get('/toggle-status/{id}', [RegisteredInstituteToggleController::class, 'index']);
                Route::prefix('staff/{id}')->group(function () {
                    Route::get('/excel', [RegisteredInstituteStaffExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredInstituteStaffPaginateController::class, 'index']);
                });
            });
            Route::prefix('non-registered-institutes')->group(function () {
                Route::get('/excel', [NonRegisteredInstituteExportController::class, 'index']);
                Route::get('/paginate', [NonRegisteredInstitutePaginateController::class, 'index']);
                Route::get('/view/{id}', [NonRegisteredInstituteViewController::class, 'index']);
            });
            Route::prefix('industries')->group(function () {
                Route::get('/excel', [IndustryExportController::class, 'index']);
                Route::get('/all', [IndustryAllController::class, 'index']);
                Route::get('/paginate', [IndustryPaginateController::class, 'index']);
                Route::post('/create', [IndustryCreateController::class, 'index']);
                Route::post('/update/{id}', [IndustryUpdateController::class, 'index']);
                Route::delete('/delete/{id}', [IndustryDeleteController::class, 'index']);
                Route::get('/view/{id}', [IndustryViewController::class, 'index']);
            });
            Route::prefix('request-industries')->group(function () {
                Route::get('/excel', [RequestIndustryExportController::class, 'index']);
                Route::get('/all', [RequestIndustryAllController::class, 'index']);
                Route::get('/paginate', [RequestIndustryPaginateController::class, 'index']);
                Route::post('/update/{id}', [RequestIndustryUpdateController::class, 'index']);
                Route::post('/approve/{id}', [RequestIndustryApproveController::class, 'index']);
                Route::delete('/delete/{id}', [RequestIndustryDeleteController::class, 'index']);
                Route::get('/view/{id}', [RequestIndustryViewController::class, 'index']);
            });
            Route::prefix('registered-industries')->group(function () {
                Route::get('/excel', [RegisteredIndustryExportController::class, 'index']);
                Route::get('/paginate', [RegisteredIndustryPaginateController::class, 'index']);
                Route::get('/view/{id}', [RegisteredIndustryViewController::class, 'index']);
                Route::post('/update/{id}', [RegisteredIndustryUpdateController::class, 'index']);
                Route::post('/update-auth/{id}', [RegisteredIndustryAuthController::class, 'index']);
                Route::get('/toggle-status/{id}', [RegisteredIndustryToggleController::class, 'index']);
                Route::prefix('staff/{id}')->group(function () {
                    Route::get('/excel', [RegisteredIndustryStaffExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredIndustryStaffPaginateController::class, 'index']);
                });
            });
            Route::prefix('non-registered-industries')->group(function () {
                Route::get('/excel', [NonRegisteredIndustryExportController::class, 'index']);
                Route::get('/paginate', [NonRegisteredIndustryPaginateController::class, 'index']);
                Route::get('/view/{id}', [NonRegisteredIndustryViewController::class, 'index']);
            });
        });
    });
});
