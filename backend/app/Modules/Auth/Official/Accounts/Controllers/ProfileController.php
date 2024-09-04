<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Auth\Common\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->guard(Guards::Admin->value())->user()),
        ], 200);
    }
}
