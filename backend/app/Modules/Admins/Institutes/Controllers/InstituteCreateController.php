<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Requests\InstituteRequest;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;

class InstituteCreateController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index(InstituteRequest $request){
        try {
            //code...
            $institute = $this->instituteService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Institute created successfully.", "data" => InstituteCollection::make($institute)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
