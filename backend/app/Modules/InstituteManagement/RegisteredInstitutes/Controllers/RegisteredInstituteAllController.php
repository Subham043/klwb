<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;

class RegisteredInstituteAllController extends Controller
{
    private $instituteService;

    public function __construct(RegisteredInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        $institute = $this->instituteService->all();
        return response()->json(["message" => "Registered Institute fetched successfully.", "data" => RegisteredInstituteCollection::collection($institute)], 200);
    }
}
