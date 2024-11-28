<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateAllController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateCreateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateExportController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDatePaginateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateToggleController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateUpdateController;
use App\Modules\Admins\ApplicationDates\Controllers\ApplicationDateViewController;
use App\Modules\Admins\Contributions\Controllers\ContributionExportController;
use App\Modules\Admins\Contributions\Controllers\ContributionPaginateController;
use App\Modules\Admins\Contributions\Controllers\ContributionRecieptPdfController;
use App\Modules\Admins\Contributions\Controllers\ContributionViewController;
use App\Modules\Admins\Contributions\Controllers\NonContributionExportController;
use App\Modules\Admins\Contributions\Controllers\NonContributionPaginateController;
use App\Modules\Admins\Contributions\Controllers\NonContributionViewController;
use App\Modules\Admins\Dashboard\AdminDashboardController;
use App\Modules\LocationManagement\Cities\Controllers\CityAllController;
use App\Modules\LocationManagement\Cities\Controllers\CityCreateController;
use App\Modules\LocationManagement\Cities\Controllers\CityExportController;
use App\Modules\LocationManagement\Cities\Controllers\CityPaginateController;
use App\Modules\LocationManagement\Cities\Controllers\CityUpdateController;
use App\Modules\LocationManagement\Cities\Controllers\CityViewController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesAllController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesCreateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesExportController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesPaginateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesUpdateController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesViewController;
use App\Modules\CourseManagement\Courses\Controllers\CourseAllController;
use App\Modules\CourseManagement\Courses\Controllers\CourseCreateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseExportController;
use App\Modules\CourseManagement\Courses\Controllers\CoursePaginateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseUpdateController;
use App\Modules\CourseManagement\Courses\Controllers\CourseViewController;
use App\Modules\Admins\Employees\Controllers\EmployeeCreateController;
use App\Modules\Admins\Employees\Controllers\EmployeeExportController;
use App\Modules\Admins\Employees\Controllers\EmployeePaginateController;
use App\Modules\Admins\Employees\Controllers\EmployeePasswordController;
use App\Modules\Admins\Employees\Controllers\EmployeeToggleStatusController;
use App\Modules\Admins\Employees\Controllers\EmployeeToggleVerificationController;
use App\Modules\Admins\Employees\Controllers\EmployeeUpdateController;
use App\Modules\Admins\Employees\Controllers\EmployeeViewController;
use App\Modules\Admins\Fees\Controllers\FeeAllController;
use App\Modules\Admins\Fees\Controllers\FeeCreateController;
use App\Modules\Admins\Fees\Controllers\FeeExportController;
use App\Modules\Admins\Fees\Controllers\FeePaginateController;
use App\Modules\Admins\Fees\Controllers\FeeToggleController;
use App\Modules\Admins\Fees\Controllers\FeeUpdateController;
use App\Modules\Admins\Fees\Controllers\FeeViewController;
use App\Modules\Admins\Industries\Controllers\IndustryAllController;
use App\Modules\Admins\Industries\Controllers\IndustryCreateController;
use App\Modules\Admins\Industries\Controllers\IndustryExportController;
use App\Modules\Admins\Industries\Controllers\IndustryPaginateController;
use App\Modules\Admins\Industries\Controllers\IndustryToggleController;
use App\Modules\Admins\Industries\Controllers\IndustryUpdateController;
use App\Modules\Admins\Industries\Controllers\IndustryViewController;
use App\Modules\Admins\Institutes\Controllers\InstituteAllController;
use App\Modules\Admins\Institutes\Controllers\InstituteCreateController;
use App\Modules\Admins\Institutes\Controllers\InstituteExportController;
use App\Modules\Admins\Institutes\Controllers\InstitutePaginateController;
use App\Modules\Admins\Institutes\Controllers\InstituteToggleController;
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
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryPasswordController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryToggleController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryUpdateController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryVerificationController;
use App\Modules\Admins\RegisteredIndustry\Controllers\RegisteredIndustryViewController;
use App\Modules\Admins\RegisteredIndustryScholarship\Controllers\RegisteredIndustryScholarshipExportController;
use App\Modules\Admins\RegisteredIndustryScholarship\Controllers\RegisteredIndustryScholarshipPaginateController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffAccountController;
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
use App\Modules\LocationManagement\States\Controllers\StatePaginateController;
use App\Modules\LocationManagement\States\Controllers\StateUpdateController;
use App\Modules\LocationManagement\States\Controllers\StateViewController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationAllController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationCreateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationExportController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationPaginateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationUpdateController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationViewController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffPaginateController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffPasswordController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffToggleController;
use App\Modules\Admins\RegisteredIndustryStaff\Controllers\RegisteredIndustryStaffVerificationController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteAuthController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteExportController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstitutePaginateController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstitutePasswordController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteToggleController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteUpdateController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteVerificationController;
use App\Modules\Admins\RegisteredInstitute\Controllers\RegisteredInstituteViewController;
use App\Modules\Admins\RegisteredInstituteScholarship\Controllers\RegisteredInstituteScholarshipPaginateController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffPaginateController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffToggleController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteAllController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteApproveController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteDeleteController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteExportController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstitutePaginateController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteUpdateController;
use App\Modules\Admins\RequestInstitutes\Controllers\RequestInstituteViewController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionAllController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionCreateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionExportController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionPaginateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionUpdateController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionViewController;
use App\Modules\Admins\RegisteredInstituteScholarship\Controllers\RegisteredInstituteScholarshipExportController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffAccountController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffExportController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffPasswordController;
use App\Modules\Admins\RegisteredInstituteStaff\Controllers\RegisteredInstituteStaffVerificationController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipApproveController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipExportController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipListController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipNoteController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipPdfController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipRejectController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipToggleStatusController;
use App\Modules\Admins\Scholarship\Controllers\AdminScholarshipViewController;
use App\Modules\Admins\SecurityQuestions\Controllers\SecurityQuestionToggleController;
use App\Modules\Admins\Students\Controllers\StudentCreateController;
use App\Modules\Admins\Students\Controllers\StudentExportController;
use App\Modules\Admins\Students\Controllers\StudentPaginateController;
use App\Modules\Admins\Students\Controllers\StudentPasswordController;
use App\Modules\Admins\Students\Controllers\StudentToggleStatusController;
use App\Modules\Admins\Students\Controllers\StudentToggleVerificationController;
use App\Modules\Admins\Students\Controllers\StudentUpdateController;
use App\Modules\Admins\Students\Controllers\StudentViewController;
use App\Modules\CourseManagement\Classes\Controllers\ClassesToggleController;
use App\Modules\CourseManagement\Courses\Controllers\CourseToggleController;
use App\Modules\CourseManagement\Graduations\Controllers\GraduationToggleController;
use App\Modules\LocationManagement\Cities\Controllers\CityToggleController;
use App\Modules\Roles\Controllers\RoleAllController;
use App\Modules\LocationManagement\States\Controllers\StateExportController;
use App\Modules\LocationManagement\States\Controllers\StateToggleController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqAllController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqCreateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqExportController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqPaginateController;
use App\Modules\LocationManagement\Taluqs\Controllers\TaluqToggleController;
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
                Route::post('/status/{id}', [EmployeeToggleStatusController::class, 'index']);
                Route::post('/verify/{id}', [EmployeeToggleVerificationController::class, 'index']);
                Route::post('/password/{id}', [EmployeePasswordController::class, 'index']);
                // Route::delete('/delete/{id}', [EmployeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [EmployeeViewController::class, 'index']);
            });
            Route::prefix('students')->group(function () {
                Route::get('/excel', [StudentExportController::class, 'index']);
                Route::get('/paginate', [StudentPaginateController::class, 'index']);
                Route::post('/create', [StudentCreateController::class, 'index']);
                Route::post('/update/{id}', [StudentUpdateController::class, 'index']);
                Route::post('/status/{id}', [StudentToggleStatusController::class, 'index']);
                Route::post('/verify/{id}', [StudentToggleVerificationController::class, 'index']);
                Route::post('/password/{id}', [StudentPasswordController::class, 'index']);
                // Route::delete('/delete/{id}', [StudentDeleteController::class, 'index']);
                Route::get('/view/{id}', [StudentViewController::class, 'index']);
            });
            Route::prefix('states')->group(function () {
                Route::get('/excel', [StateExportController::class, 'index']);
                Route::get('/all', [StateAllController::class, 'index']);
                Route::get('/paginate', [StatePaginateController::class, 'index']);
                Route::post('/create', [StateCreateController::class, 'index']);
                Route::post('/update/{id}', [StateUpdateController::class, 'index']);
                Route::post('/status/{id}', [StateToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [StateDeleteController::class, 'index']);
                Route::get('/view/{id}', [StateViewController::class, 'index']);
            });
            Route::prefix('cities')->group(function () {
                Route::get('/excel', [CityExportController::class, 'index']);
                Route::get('/all', [CityAllController::class, 'index']);
                Route::get('/paginate', [CityPaginateController::class, 'index']);
                Route::post('/create', [CityCreateController::class, 'index']);
                Route::post('/update/{id}', [CityUpdateController::class, 'index']);
                Route::post('/status/{id}', [CityToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [CityDeleteController::class, 'index']);
                Route::get('/view/{id}', [CityViewController::class, 'index']);
            });
            Route::prefix('taluqs')->group(function () {
                Route::get('/excel', [TaluqExportController::class, 'index']);
                Route::get('/all', [TaluqAllController::class, 'index']);
                Route::get('/paginate', [TaluqPaginateController::class, 'index']);
                Route::post('/create', [TaluqCreateController::class, 'index']);
                Route::post('/update/{id}', [TaluqUpdateController::class, 'index']);
                Route::post('/status/{id}', [TaluqToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [TaluqDeleteController::class, 'index']);
                Route::get('/view/{id}', [TaluqViewController::class, 'index']);
            });
            Route::prefix('graduations')->group(function () {
                Route::get('/excel', [GraduationExportController::class, 'index']);
                Route::get('/all', [GraduationAllController::class, 'index']);
                Route::get('/paginate', [GraduationPaginateController::class, 'index']);
                Route::post('/create', [GraduationCreateController::class, 'index']);
                Route::post('/update/{id}', [GraduationUpdateController::class, 'index']);
                Route::post('/status/{id}', [GraduationToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [GraduationDeleteController::class, 'index']);
                Route::get('/view/{id}', [GraduationViewController::class, 'index']);
            });
            Route::prefix('courses')->group(function () {
                Route::get('/excel', [CourseExportController::class, 'index']);
                Route::get('/all', [CourseAllController::class, 'index']);
                Route::get('/paginate', [CoursePaginateController::class, 'index']);
                Route::post('/create', [CourseCreateController::class, 'index']);
                Route::post('/update/{id}', [CourseUpdateController::class, 'index']);
                Route::post('/status/{id}', [CourseToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [CourseDeleteController::class, 'index']);
                Route::get('/view/{id}', [CourseViewController::class, 'index']);
            });
            Route::prefix('classes')->group(function () {
                Route::get('/excel', [ClassesExportController::class, 'index']);
                Route::get('/all', [ClassesAllController::class, 'index']);
                Route::get('/paginate', [ClassesPaginateController::class, 'index']);
                Route::post('/create', [ClassesCreateController::class, 'index']);
                Route::post('/update/{id}', [ClassesUpdateController::class, 'index']);
                Route::post('/status/{id}', [ClassesToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [ClassesDeleteController::class, 'index']);
                Route::get('/view/{id}', [ClassesViewController::class, 'index']);
            });
            Route::prefix('security-questions')->group(function () {
                Route::get('/excel', [SecurityQuestionExportController::class, 'index']);
                Route::get('/all', [SecurityQuestionAllController::class, 'index']);
                Route::get('/paginate', [SecurityQuestionPaginateController::class, 'index']);
                Route::post('/create', [SecurityQuestionCreateController::class, 'index']);
                Route::post('/update/{id}', [SecurityQuestionUpdateController::class, 'index']);
                Route::post('/status/{id}', [SecurityQuestionToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [SecurityQuestionDeleteController::class, 'index']);
                Route::get('/view/{id}', [SecurityQuestionViewController::class, 'index']);
            });
            Route::prefix('fees')->group(function () {
                Route::get('/excel', [FeeExportController::class, 'index']);
                Route::get('/all', [FeeAllController::class, 'index']);
                Route::get('/paginate', [FeePaginateController::class, 'index']);
                Route::post('/create', [FeeCreateController::class, 'index']);
                Route::post('/update/{id}', [FeeUpdateController::class, 'index']);
                Route::post('/status/{id}', [FeeToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [FeeDeleteController::class, 'index']);
                Route::get('/view/{id}', [FeeViewController::class, 'index']);
            });
            Route::prefix('application-dates')->group(function () {
                Route::get('/excel', [ApplicationDateExportController::class, 'index']);
                Route::get('/all', [ApplicationDateAllController::class, 'index']);
                Route::get('/paginate', [ApplicationDatePaginateController::class, 'index']);
                Route::post('/create', [ApplicationDateCreateController::class, 'index']);
                Route::post('/update/{id}', [ApplicationDateUpdateController::class, 'index']);
                Route::post('/status/{id}', [ApplicationDateToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [ApplicationDateDeleteController::class, 'index']);
                Route::get('/view/{id}', [ApplicationDateViewController::class, 'index']);
            });
            Route::prefix('institutes')->group(function () {
                Route::get('/excel', [InstituteExportController::class, 'index']);
                Route::get('/all', [InstituteAllController::class, 'index']);
                Route::get('/paginate', [InstitutePaginateController::class, 'index']);
                Route::post('/create', [InstituteCreateController::class, 'index']);
                Route::post('/update/{id}', [InstituteUpdateController::class, 'index']);
                Route::post('/status/{id}', [InstituteToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [InstituteDeleteController::class, 'index']);
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
                Route::post('/update-password/{id}', [RegisteredInstitutePasswordController::class, 'index']);
                Route::post('/toggle-status/{id}', [RegisteredInstituteToggleController::class, 'index']);
                Route::post('/toggle-verification/{id}', [RegisteredInstituteVerificationController::class, 'index']);
                Route::prefix('staff/{id}')->group(function () {
                    Route::get('/excel', [RegisteredInstituteStaffExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredInstituteStaffPaginateController::class, 'index']);
                    Route::post('/status/{staff_id}', [RegisteredInstituteStaffToggleController::class, 'index']);
                    Route::post('/verify/{staff_id}', [RegisteredInstituteStaffVerificationController::class, 'index']);
                    Route::post('/account/{staff_id}', [RegisteredInstituteStaffAccountController::class, 'index']);
                    Route::post('/password/{staff_id}', [RegisteredInstituteStaffPasswordController::class, 'index']);
                });
                Route::prefix('scholarship/{id}')->group(function () {
                    Route::get('/excel', [RegisteredInstituteScholarshipExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredInstituteScholarshipPaginateController::class, 'index']);
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
                Route::post('/status/{id}', [IndustryToggleController::class, 'index']);
                // Route::delete('/delete/{id}', [IndustryDeleteController::class, 'index']);
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
                Route::post('/update-password/{id}', [RegisteredIndustryPasswordController::class, 'index']);
                Route::post('/toggle-status/{id}', [RegisteredIndustryToggleController::class, 'index']);
                Route::post('/toggle-verification/{id}', [RegisteredIndustryVerificationController::class, 'index']);
                Route::prefix('staff/{id}')->group(function () {
                    Route::get('/excel', [RegisteredIndustryStaffExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredIndustryStaffPaginateController::class, 'index']);
                    Route::post('/status/{staff_id}', [RegisteredIndustryStaffToggleController::class, 'index']);
                    Route::post('/verify/{staff_id}', [RegisteredIndustryStaffVerificationController::class, 'index']);
                    Route::post('/account/{staff_id}', [RegisteredIndustryStaffAccountController::class, 'index']);
                    Route::post('/password/{staff_id}', [RegisteredIndustryStaffPasswordController::class, 'index']);
                });
                Route::prefix('scholarship/{id}')->group(function () {
                    Route::get('/excel', [RegisteredIndustryScholarshipExportController::class, 'index']);
                    Route::get('/paginate', [RegisteredIndustryScholarshipPaginateController::class, 'index']);
                });
            });
            Route::prefix('non-registered-industries')->group(function () {
                Route::get('/excel', [NonRegisteredIndustryExportController::class, 'index']);
                Route::get('/paginate', [NonRegisteredIndustryPaginateController::class, 'index']);
                Route::get('/view/{id}', [NonRegisteredIndustryViewController::class, 'index']);
            });
            Route::prefix('scholarship')->group(function () {
				Route::get('/list', [AdminScholarshipListController::class, 'index']);
				Route::get('/excel', [AdminScholarshipExportController::class, 'index']);
				Route::get('/view/{id}', [AdminScholarshipViewController::class, 'index']);
				Route::post('/approve/{id}', [AdminScholarshipApproveController::class, 'index']);
				Route::post('/reject/{id}', [AdminScholarshipRejectController::class, 'index']);
				Route::post('/toggle-status/{id}', [AdminScholarshipToggleStatusController::class, 'index']);
				Route::post('/note/{id}', [AdminScholarshipNoteController::class, 'index']);
				Route::get('/pdf/{id}', [AdminScholarshipPdfController::class, 'index']);
			});
            Route::prefix('contribution')->group(function () {
				Route::get('/list', [ContributionPaginateController::class, 'index']);
				Route::get('/excel', [ContributionExportController::class, 'index']);
				Route::get('/view/{id}', [ContributionViewController::class, 'index']);
				Route::get('/reciept/{id}', [ContributionRecieptPdfController::class, 'index']);
			});
            Route::prefix('non-contribution')->group(function () {
				Route::get('/list', [NonContributionPaginateController::class, 'index']);
				Route::get('/excel', [NonContributionExportController::class, 'index']);
				Route::get('/view/{id}', [NonContributionViewController::class, 'index']);
			});
			Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        });
    });
});
