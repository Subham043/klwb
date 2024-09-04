<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use Illuminate\Http\Request;

class NonRegisteredPaginateController extends Controller
{
    public function __construct(private InstituteNonRegisteredService $instituteService){}

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return RegisteredInstituteCollection::collection($data);
    }

}
