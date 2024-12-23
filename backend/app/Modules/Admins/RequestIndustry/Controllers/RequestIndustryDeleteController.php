<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryDeleteController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Delete the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $industry = $this->industryService->getById($id);

        try {
            //code...
            $this->industryService->delete(
                $industry
            );
            return response()->json(["message" => "Request Industry deleted successfully.", "data" => RequestIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
