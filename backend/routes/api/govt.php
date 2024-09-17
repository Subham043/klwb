<?php

use App\Http\Enums\Guards;
use App\Modules\Govt\Dashboard\GovtDashboardController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipApproveController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipListController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipNoteController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipRejectController;
use App\Modules\Govt\Scholarship\Controllers\GovtScholarshipViewController;
use Illuminate\Support\Facades\Route;


Route::prefix('govt')->group(function () {
	Route::prefix('v1')->group(function () {
		Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Verification-Officer'])->group(function () {
			Route::prefix('scholarship')->group(function () {
				Route::get('/list', [GovtScholarshipListController::class, 'index']);
				Route::get('/view/{id}', [GovtScholarshipViewController::class, 'index']);
				Route::get('/approve/{id}', [GovtScholarshipApproveController::class, 'index']);
				Route::post('/reject/{id}', [GovtScholarshipRejectController::class, 'index']);
				Route::post('/note/{id}', [GovtScholarshipNoteController::class, 'index']);
			});
			Route::get('/dashboard', [GovtDashboardController::class, 'index']);
		});
	});
});
