<?php

namespace App\Modules\Students\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Accounts\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->user()),
        ], 200);
    }
}
