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
            if($request->hasValidSignature()) {
                return Storage::download($request->path);
            }
            return response()->json([
                'message' => "Link has expired.",
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Link has expired.",
            ], 404);
        }
    }
}