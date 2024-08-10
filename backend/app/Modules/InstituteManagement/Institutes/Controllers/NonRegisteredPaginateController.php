<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use Illuminate\Http\Request;

class NonRegisteredPaginateController extends Controller
{
    private $instituteService;

    public function __construct(InstituteNonRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return RegisteredInstituteCollection::collection($data);
    }

}
