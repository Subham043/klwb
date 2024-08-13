<?php

namespace App\Modules\IndustryManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Accounts\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->guard(Guards::Industry->value())->user()),
        ], 200);
    }
}
