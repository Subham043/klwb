<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;

class RegisteredInstituteViewController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Registered Institute fetched successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
    }
}
