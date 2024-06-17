<?php

use App\Modules\ApplicationDates\Controllers\ApplicationDateAllController;
use App\Modules\ApplicationDates\Controllers\ApplicationDateCreateController;
use App\Modules\ApplicationDates\Controllers\ApplicationDateDeleteController;
use App\Modules\ApplicationDates\Controllers\ApplicationDatePaginateController;
use App\Modules\ApplicationDates\Controllers\ApplicationDateUpdateController;
use App\Modules\ApplicationDates\Controllers\ApplicationDateViewController;
use App\Modules\Cities\Controllers\CityAllController;
use App\Modules\Cities\Controllers\CityCreateController;
use App\Modules\Cities\Controllers\CityDeleteController;
use App\Modules\Cities\Controllers\CityPaginateController;
use App\Modules\Cities\Controllers\CityUpdateController;
use App\Modules\Cities\Controllers\CityViewController;
use App\Modules\Classes\Controllers\ClassesAllController;
use App\Modules\Classes\Controllers\ClassesCreateController;
use App\Modules\Classes\Controllers\ClassesDeleteController;
use App\Modules\Classes\Controllers\ClassesExportController;
use App\Modules\Classes\Controllers\ClassesPaginateController;
use App\Modules\Classes\Controllers\ClassesUpdateController;
use App\Modules\Classes\Controllers\ClassesViewController;
use App\Modules\Courses\Controllers\CourseAllController;
use App\Modules\Courses\Controllers\CourseCreateController;
use App\Modules\Courses\Controllers\CourseDeleteController;
use App\Modules\Courses\Controllers\CourseExportController;
use App\Modules\Courses\Controllers\CoursePaginateController;
use App\Modules\Courses\Controllers\CourseUpdateController;
use App\Modules\Courses\Controllers\CourseViewController;
use App\Modules\Employees\Controllers\EmployeeCreateController;
use App\Modules\Employees\Controllers\EmployeeDeleteController;
use App\Modules\Employees\Controllers\EmployeePaginateController;
use App\Modules\Employees\Controllers\EmployeeUpdateController;
use App\Modules\Employees\Controllers\EmployeeViewController;
use App\Modules\Fees\Controllers\FeeAllController;
use App\Modules\Fees\Controllers\FeeCreateController;
use App\Modules\Fees\Controllers\FeeDeleteController;
use App\Modules\Fees\Controllers\FeePaginateController;
use App\Modules\Fees\Controllers\FeeUpdateController;
use App\Modules\Fees\Controllers\FeeViewController;
use App\Modules\States\Controllers\StateAllController;
use App\Modules\States\Controllers\StateCreateController;
use App\Modules\States\Controllers\StateDeleteController;
use App\Modules\States\Controllers\StatePaginateController;
use App\Modules\States\Controllers\StateUpdateController;
use App\Modules\States\Controllers\StateViewController;
use App\Modules\Graduations\Controllers\GraduationAllController;
use App\Modules\Graduations\Controllers\GraduationCreateController;
use App\Modules\Graduations\Controllers\GraduationDeleteController;
use App\Modules\Graduations\Controllers\GraduationExportController;
use App\Modules\Graduations\Controllers\GraduationPaginateController;
use App\Modules\Graduations\Controllers\GraduationUpdateController;
use App\Modules\Graduations\Controllers\GraduationViewController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionAllController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionCreateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionDeleteController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionPaginateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionUpdateController;
use App\Modules\SecurityQuestions\Controllers\SecurityQuestionViewController;
use App\Modules\Taluqs\Controllers\TaluqAllController;
use App\Modules\Taluqs\Controllers\TaluqCreateController;
use App\Modules\Taluqs\Controllers\TaluqDeleteController;
use App\Modules\Taluqs\Controllers\TaluqPaginateController;
use App\Modules\Taluqs\Controllers\TaluqUpdateController;
use App\Modules\Taluqs\Controllers\TaluqViewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:Super-Admin|Admin'])->prefix('admin')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('employees')->group(function () {
            Route::get('/paginate', [EmployeePaginateController::class, 'index']);
            Route::post('/create', [EmployeeCreateController::class, 'index']);
            Route::post('/update/{id}', [EmployeeUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [EmployeeDeleteController::class, 'index']);
            Route::get('/view/{id}', [EmployeeViewController::class, 'index']);
        });
        Route::prefix('states')->group(function () {
            Route::get('/all', [StateAllController::class, 'index']);
            Route::get('/paginate', [StatePaginateController::class, 'index']);
            Route::post('/create', [StateCreateController::class, 'index']);
            Route::post('/update/{id}', [StateUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [StateDeleteController::class, 'index']);
            Route::get('/view/{id}', [StateViewController::class, 'index']);
        });
        Route::prefix('cities')->group(function () {
            Route::get('/all', [CityAllController::class, 'index']);
            Route::get('/paginate', [CityPaginateController::class, 'index']);
            Route::post('/create', [CityCreateController::class, 'index']);
            Route::post('/update/{id}', [CityUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [CityDeleteController::class, 'index']);
            Route::get('/view/{id}', [CityViewController::class, 'index']);
        });
        Route::prefix('taluqs')->group(function () {
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
            Route::get('/all', [SecurityQuestionAllController::class, 'index']);
            Route::get('/paginate', [SecurityQuestionPaginateController::class, 'index']);
            Route::post('/create', [SecurityQuestionCreateController::class, 'index']);
            Route::post('/update/{id}', [SecurityQuestionUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [SecurityQuestionDeleteController::class, 'index']);
            Route::get('/view/{id}', [SecurityQuestionViewController::class, 'index']);
        });
        Route::prefix('fees')->group(function () {
            Route::get('/all', [FeeAllController::class, 'index']);
            Route::get('/paginate', [FeePaginateController::class, 'index']);
            Route::post('/create', [FeeCreateController::class, 'index']);
            Route::post('/update/{id}', [FeeUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [FeeDeleteController::class, 'index']);
            Route::get('/view/{id}', [FeeViewController::class, 'index']);
        });
        Route::prefix('application-dates')->group(function () {
            Route::get('/all', [ApplicationDateAllController::class, 'index']);
            Route::get('/paginate', [ApplicationDatePaginateController::class, 'index']);
            Route::post('/create', [ApplicationDateCreateController::class, 'index']);
            Route::post('/update/{id}', [ApplicationDateUpdateController::class, 'index']);
            Route::delete('/delete/{id}', [ApplicationDateDeleteController::class, 'index']);
            Route::get('/view/{id}', [ApplicationDateViewController::class, 'index']);
        });
    });
});