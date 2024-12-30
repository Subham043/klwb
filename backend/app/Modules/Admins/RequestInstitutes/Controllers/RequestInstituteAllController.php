<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteAllController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $institute = $this->instituteService->all();
        return response()->json(["message" => "Request Institute fetched successfully.", "data" => RequestInstituteCollection::collection($institute)], 200);
    }
}
