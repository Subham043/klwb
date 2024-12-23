<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;

class RegisteredIndustryViewController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    /**
     * Get a registered industry by its id.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Registered Industry fetched successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
    }
}
