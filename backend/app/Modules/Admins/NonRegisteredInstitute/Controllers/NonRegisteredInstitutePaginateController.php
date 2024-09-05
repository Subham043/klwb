<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;
use App\Modules\Admins\NonRegisteredInstitute\Resources\nonRegisteredInstituteCollection;
use Illuminate\Http\Request;

class NonRegisteredInstitutePaginateController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return nonRegisteredInstituteCollection::collection($data);
    }

}
