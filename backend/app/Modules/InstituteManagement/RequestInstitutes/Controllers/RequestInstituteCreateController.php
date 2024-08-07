<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Requests\RequestInstituteRequest;
use App\Modules\InstituteManagement\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteCreateController extends Controller
{
    private $instituteService;

    public function __construct(RequestInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(RequestInstituteRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $institute = $this->instituteService->create(
                $request->except(['register_doc'])
            );
            if($request->hasFile('register_doc')){
                $this->instituteService->saveRegisterDoc($institute);
            }
            return response()->json(["message" => "Request Institute created successfully.", "data" => RequestInstituteCollection::make($institute)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
