<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;

class RegisteredInstituteAllController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index(){
        $institute = $this->instituteService->all();
        return response()->json(["message" => "Registered Institute fetched successfully.", "data" => RegisteredInstituteCollection::collection($institute)], 200);
    }
}
