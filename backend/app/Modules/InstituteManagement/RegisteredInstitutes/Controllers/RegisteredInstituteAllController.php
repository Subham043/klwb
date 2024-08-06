<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;
use Illuminate\Http\Request;

class RegisteredInstituteAllController extends Controller
{
    private $instituteService;

    public function __construct(RegisteredInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(Request $request){
        $institute = $this->instituteService->all($request->taluq_id ?? null);
        return response()->json(["message" => "Registered Institute fetched successfully.", "data" => RegisteredInstituteCollection::collection($institute)], 200);
    }
}
