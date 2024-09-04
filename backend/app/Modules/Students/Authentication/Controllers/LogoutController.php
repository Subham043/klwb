<?php

namespace App\Modules\Students\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Authentication\Services\AuthService;
use Illuminate\Http\Request;
use App\Http\Enums\Guards;

class LogoutController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(Request $request){

        $this->authService->logout($request, Guards::Web->value());
        return response()->json([
            'message' => 'Logged out successfully.',
        ], 200);
    }
}
