<?php

namespace App\Http\Controllers;

use App\Http\Enums\Guards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request)
    {
        try {
            //code...
            if((auth()->guard(Guards::Web->value())->user() || auth()->guard(Guards::Institute->value())->user() || auth()->guard(Guards::Industry->value())->user() || auth()->guard(Guards::Admin->value())->user()) && $request->hasValidSignature()) {
                return Storage::download($request->path);
            }
            abort(404, "Link has expired.");
        } catch (\Throwable $th) {
            // throw $th;
            abort(404, "Link has expired.");
        }
    }
}