<?php

namespace App\Modules\Auth\Institute\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Auth\Institute\Authentication\Services\AuthService;
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
