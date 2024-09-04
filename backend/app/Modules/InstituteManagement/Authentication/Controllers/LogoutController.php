<?php

namespace App\Modules\InstituteManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Authentication\Services\AuthService;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(Request $request){

        $this->authService->logout($request, Guards::Institute->value());
        return response()->json([
            'message' => 'Logged out successfully.',
        ], 200);
    }
}
