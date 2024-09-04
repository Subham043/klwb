<?php

namespace App\Modules\Auth\Student\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Auth\Common\Resources\ProfileCollection;

class ProfileController extends Controller
{
    public function index(){
        return response()->json([
            'profile' => ProfileCollection::make(auth()->guard(Guards::Web->value())->user()),
        ], 200);
    }
}
