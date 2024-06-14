<?php

namespace App\Modules\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Accounts\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->user()),
        ], 200);
    }
}