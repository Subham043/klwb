<?php

use App\Http\Controllers\FileController;
use App\Modules\IndustryManagement\Payment\Controllers\SBIPaymentController;
use App\Modules\IndustryManagement\Payment\Controllers\SBIPaymentVerifyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(config('app.client_url'));
});

Route::prefix('sbi')->group(function () {
    Route::get('/make-payment/{id}', [SBIPaymentController::class, 'index'])->name('sbi_make_payment');
    Route::post('/payment/success/{id}', [SBIPaymentVerifyController::class, 'success'])->name('sbi_success_callback');
    Route::post('/payment/fail/{id}', [SBIPaymentVerifyController::class, 'fail'])->name('sbi_failure_callback');
});


Route::get('/public/files', [FileController::class, 'index'])->name('storage.files');

Route::get('/private/file', function (Request $request) {
    if($request->wantsJson()) {
        return response()->json([
            'message' => "Link has expired.",
        ], 404);
    }
    abort(404, "Link has expired.");
})->name('login');