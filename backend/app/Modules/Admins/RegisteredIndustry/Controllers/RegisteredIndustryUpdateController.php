<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Requests\RegisteredIndustryUpdateRequest;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryUpdateController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\Admins\RegisteredIndustry\Requests\RegisteredIndustryUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index(RegisteredIndustryUpdateRequest $request, $id){
        $industry = $this->industryService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->industryService->update($request, $industry);
            return response()->json(["message" => "Registered Industry updated successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
