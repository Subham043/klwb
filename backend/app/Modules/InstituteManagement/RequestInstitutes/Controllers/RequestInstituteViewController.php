<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteViewController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Request Institute fetched successfully.", "data" => RequestInstituteCollection::make($institute)], 200);
    }
}
