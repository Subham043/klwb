<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;
use Illuminate\Http\Request;

class RegisteredInstitutePaginateController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Fetch all registered institutes.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return RegisteredInstituteCollection::collection($data);
    }

}
