<?php

namespace App\Modules\Students\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Authentication\Services\AuthService;
use Illuminate\Http\Request;
use App\Http\Enums\Guards;

class LogoutController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(Request $request){

        $this->authService->logout($request, Guards::Web->value());
        return response()->json([
            'message' => 'Logged out successfully.',
        ], 200);
    }
}
