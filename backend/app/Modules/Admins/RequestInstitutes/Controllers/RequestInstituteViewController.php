<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteViewController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Request Institute fetched successfully.", "data" => RequestInstituteCollection::make($institute)], 200);
    }
}
