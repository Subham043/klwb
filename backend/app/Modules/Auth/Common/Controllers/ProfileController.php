<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request){
        return response()->json([
            'profile' => ProfileCollection::make($request->user()),
        ], 200);
    }
}
