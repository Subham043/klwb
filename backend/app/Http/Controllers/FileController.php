<?php

namespace App\Http\Controllers;

use App\Http\Enums\Guards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request)
    {
        if($request->hasValidSignature()) {
            if((auth()->guard(Guards::Web->value())->user() || auth()->guard(Guards::Institute->value())->user() || auth()->guard(Guards::Industry->value())->user() || auth()->guard(Guards::Admin->value())->user())) {
                if(Storage::exists($request->path)){
                    return response()->file(storage_path('app/public/'.$request->path), [
                        'Content-Type' => Storage::mimeType($request->path),
                        'Content-Length' => Storage::size($request->path),
                        'Content-Disposition' => 'attachment; filename="'.basename($request->path).'"',
                        'Access-Control-Allow-Credentials' => 'true',
                        'Access-Control-Allow-Origin' => config('app.client_url'),
                        'Access-Control-Expose-Headers' => '*',
                    ]);
                }
                abort(404, "File not found.");
            }
            abort(401, "Unauthorized.");
        }
        abort(403, "Link has expired.");
    }
}