<?php

namespace App\Modules\Auth\Institute\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Auth\Institute\Accounts\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->guard(Guards::Institute->value())->user()),
        ], 200);
    }
}
