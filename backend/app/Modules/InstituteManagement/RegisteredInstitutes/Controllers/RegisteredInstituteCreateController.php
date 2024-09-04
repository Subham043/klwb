<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Requests\RegisteredInstituteRequest;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;

class RegisteredInstituteCreateController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index(RegisteredInstituteRequest $request){
        try {
            //code...
            $institute = $this->instituteService->create(
                $request->validated()
            );
            return response()->json(["message" => "Registered Institute created successfully.", "data" => RegisteredInstituteCollection::make($institute)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
