<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteAllController extends Controller
{
    private $instituteService;

    public function __construct(RequestInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        $institute = $this->instituteService->all();
        return response()->json(["message" => "Request Institute fetched successfully.", "data" => RequestInstituteCollection::collection($institute)], 200);
    }
}
