<?php

use App\Http\Controllers\FileController;
use App\Http\Services\AESEncDecService;
use App\Modules\IndustryManagement\Payment\Controllers\SBIPaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(config('app.client_url'));
});

Route::prefix('sbi')->group(function () {
    Route::get('/make-payment/{id}', [SBIPaymentController::class, 'index'])->name('sbi_make_payment');
    Route::post('/payment/success/{id}', function () {
        return response()->json([
            'message' => "Suceess.",
        ]);
    })->name('sbi_success_callback');
    Route::post('/payment/fail/{id}', function () {
        $encData = (new AESEncDecService)->decrypt(request('encData'),config('services.sbi.key'));
        dd($encData);
        return response()->json([
            'request' => request(),
            'message' => "Failure.",
        ]);
    })->name('sbi_failure_callback');
});


Route::get('/public/files', [FileController::class, 'index'])->name('storage.files');

Route::get('/private/file', function () {
    return response()->json([
        'message' => "Link has expired.",
    ], 404);
})->name('login');