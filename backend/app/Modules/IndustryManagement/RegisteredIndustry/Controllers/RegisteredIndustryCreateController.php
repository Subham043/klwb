<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Requests\RegisteredIndustryRequest;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryCreateController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(RegisteredIndustryRequest $request){
        try {
            //code...
            $industry = $this->industryService->create(
                $request->validated()
            );
            return response()->json(["message" => "Registered Industry created successfully.", "data" => RegisteredIndustryCollection::make($industry)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
