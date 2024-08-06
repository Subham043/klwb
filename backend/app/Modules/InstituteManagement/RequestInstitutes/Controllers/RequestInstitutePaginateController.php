<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Http\Request;

class RequestInstitutePaginateController extends Controller
{
    private $instituteService;

    public function __construct(RequestInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return RequestInstituteCollection::collection($data);
    }

}
