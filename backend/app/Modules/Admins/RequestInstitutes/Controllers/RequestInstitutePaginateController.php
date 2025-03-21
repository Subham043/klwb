<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Http\Request;

class RequestInstitutePaginateController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Fetch all request institutes with pagination.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return RequestInstituteCollection::collection($data);
    }

}
