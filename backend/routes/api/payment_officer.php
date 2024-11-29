<?php

use App\Http\Enums\Guards;
use App\Modules\PaymentOfficer\Contribution\Controllers\ContributionExportController;
use App\Modules\PaymentOfficer\Contribution\Controllers\ContributionPaginateController;
use App\Modules\PaymentOfficer\Contribution\Controllers\ContributionRecieptPdfController;
use App\Modules\PaymentOfficer\Contribution\Controllers\ContributionViewController;
use App\Modules\PaymentOfficer\Contribution\Controllers\NonContributionExportController;
use App\Modules\PaymentOfficer\Contribution\Controllers\NonContributionPaginateController;
use App\Modules\PaymentOfficer\Contribution\Controllers\NonContributionViewController;
use App\Modules\PaymentOfficer\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;


Route::prefix('payment-officer')->group(function () {
	Route::prefix('v1')->group(function () {
		Route::middleware([Guards::Admin->middleware(), 'verified', 'role:Payment-Officer'])->group(function () {
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
			Route::get('/dashboard', [DashboardController::class, 'index']);
		});
	});
});