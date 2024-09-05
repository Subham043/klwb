<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Requests\RequestIndustryRequest;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryUpdateController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    public function index(RequestIndustryRequest $request, $id){
        $industry = $this->industryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->industryService->update(
                $request->except(['register_doc']),
                $industry
            );
            if($request->hasFile('register_doc')){
                $this->industryService->saveRegisterDoc($industry);
            }
            return response()->json(["message" => "Request Industry updated successfully.", "data" => RequestIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
