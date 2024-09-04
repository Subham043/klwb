<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Requests\RegisteredIndustryRequest;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryUpdateController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(RegisteredIndustryRequest $request, $id){
        $industry = $this->industryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->industryService->update(
                $request->validated(),
                $industry
            );
            return response()->json(["message" => "Registered Industry updated successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
