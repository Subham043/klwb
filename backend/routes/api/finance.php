<?php

use App\Http\Enums\Guards;
use App\Modules\Finance\Dashboard\FinanceDashboardController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipApproveController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipApproveMultipleController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipExportController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipIndustryConfirmationPdfController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipInstituteConfirmationPdfController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipListController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipPdfController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipRejectController;
use App\Modules\Finance\Scholarship\Controllers\FinanceScholarshipViewController;
use Illuminate\Support\Facades\Route;


Route::prefix('finance')->group(function () {
	Route::prefix('v1')->group(function () {
		Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Financial-Officer'])->group(function () {
			Route::prefix('scholarship')->group(function () {
				Route::get('/list', [FinanceScholarshipListController::class, 'index']);
				Route::get('/excel', [FinanceScholarshipExportController::class, 'index']);
				Route::post('/approve-multiple', [FinanceScholarshipApproveMultipleController::class, 'index']);
				Route::get('/view/{id}', [FinanceScholarshipViewController::class, 'index']);
				Route::post('/approve/{id}', [FinanceScholarshipApproveController::class, 'index']);
				Route::post('/reject/{id}', [FinanceScholarshipRejectController::class, 'index']);
				Route::get('/pdf/{id}', [FinanceScholarshipPdfController::class, 'index']);
				Route::get('/institute-confirmation-pdf/{id}', [FinanceScholarshipInstituteConfirmationPdfController::class, 'index']);
    Route::get('/industry-confirmation-pdf/{id}', [FinanceScholarshipIndustryConfirmationPdfController::class, 'index']);
			});
			Route::get('/dashboard', [FinanceDashboardController::class, 'index']);
		});
	});
});
