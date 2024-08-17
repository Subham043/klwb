<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request)
    {
        try {
            //code...
            if($request->user() && $request->hasValidSignature()) {
                return Storage::download($request->path);
            }
            abort(404, "Link has expired.");
        } catch (\Throwable $th) {
            abort(404, "Link has expired.");
        }
    }
}