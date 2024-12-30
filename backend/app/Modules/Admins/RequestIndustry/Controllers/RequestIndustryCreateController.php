<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Requests\RequestIndustryRequest;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryCreateController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
