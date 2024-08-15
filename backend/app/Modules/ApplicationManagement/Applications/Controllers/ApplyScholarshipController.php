<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Requests\ApplyScholarshipRequest;
use App\Modules\ApplicationManagement\Applications\Services\ScholarshipService;

class ApplyScholarshipController extends Controller
{
    private $scholarshipService;

    public function __construct(ScholarshipService $scholarshipService)
    {
        $this->scholarshipService = $scholarshipService;
    }

    public function index(ApplyScholarshipRequest $request){
        try {
            //code...
            $this->scholarshipService->apply(
                [...$request->validated()]
            );
            return response()->json(["message" => "Scholarship applied successfully."], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
