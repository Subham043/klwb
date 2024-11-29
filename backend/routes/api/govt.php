<?php

use App\Http\Enums\Guards;
use App\Modules\Admins\Reports\Scholarship\Controllers\ScholarshipReportExportController;
use App\Modules\Admins\Reports\Scholarship\Controllers\ScholarshipReportListController;
use App\Modules\Govt\Dashboard\GovtDashboardController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipApproveController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipExportController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipIndustryConfirmationPdfController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipInstituteConfirmationPdfController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipListController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipNoteController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipPdfController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipRejectController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipViewController;
use Illuminate\Support\Facades\Route;


Route::prefix('govt')->group(function () {
	Route::prefix('v1')->group(function () {
		Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Verification-Officer'])->group(function () {
			Route::prefix('scholarship')->group(function () {
				Route::get('/list', [GovtScholarshipListController::class, 'index']);
				Route::get('/excel', [GovtScholarshipExportController::class, 'index']);
				Route::get('/view/{id}', [GovtScholarshipViewController::class, 'index']);
				Route::post('/approve/{id}', [GovtScholarshipApproveController::class, 'index']);
				Route::post('/reject/{id}', [GovtScholarshipRejectController::class, 'index']);
				Route::post('/note/{id}', [GovtScholarshipNoteController::class, 'index']);
				Route::get('/pdf/{id}', [GovtScholarshipPdfController::class, 'index']);
				Route::get('/institute-confirmation-pdf/{id}', [GovtScholarshipInstituteConfirmationPdfController::class, 'index']);
    Route::get('/industry-confirmation-pdf/{id}', [GovtScholarshipIndustryConfirmationPdfController::class, 'index']);
			});
			Route::prefix('report')->group(function () {
				Route::prefix('scholarship')->group(function () {
								Route::get('/excel', [ScholarshipReportExportController::class, 'index']);
								Route::get('/list', [ScholarshipReportListController::class, 'index']);
				});
			});
			Route::get('/dashboard', [GovtDashboardController::class, 'index']);
		});
	});
});
