<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Requests\IndustryRequest;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;

class IndustryCreateController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    public function index(IndustryRequest $request){
        try {
            //code...
            $industry = $this->industryService->create(
                $request->validated()
            );
            return response()->json(["message" => "Industry created successfully.", "data" => IndustryCollection::make($industry)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
