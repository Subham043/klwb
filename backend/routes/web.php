<?php

use App\Modules\Authentication\Controllers\VerifyRegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('/email/verify')->group(function () {
    Route::get('/{id}/{hash}', [VerifyRegisteredUserController::class, 'verify_email', 'as' => 'verify_email'])->name('verification.verify');
});
