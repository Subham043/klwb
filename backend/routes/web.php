<?php

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(config('app.client_url'));
});

Route::get('/public/files', [FileController::class, 'index'])->name('storage.files')->middleware(['auth:sanctum']);

Route::get('/private/file', function () {
    return response()->json([
        'message' => "Link has expired.",
    ], 404);
})->name('login');
