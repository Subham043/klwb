<?php

namespace App\Modules\Auth\Industry\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Auth\Industry\Authentication\Services\AuthService;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(Request $request){

        $this->authService->logout($request, Guards::Industry->value());
        return response()->json([
            'message' => 'Logged out successfully.',
        ], 200);
    }
}
