<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Requests\RequestIndustryRequest;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryCreateController extends Controller
{
    private $industryService;

    public function __construct(RequestIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(RequestIndustryRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $industry = $this->industryService->create(
                $request->except(['register_doc'])
            );
            if($request->hasFile('register_doc')){
                $this->industryService->saveRegisterDoc($industry);
            }
            return response()->json(["message" => "Request Industry created successfully.", "data" => RequestIndustryCollection::make($industry)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
