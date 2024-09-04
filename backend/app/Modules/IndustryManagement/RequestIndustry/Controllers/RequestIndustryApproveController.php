<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryApproveController extends Controller
{
    public function __construct(private RequestIndustryService $reqIndustryService, private RegisteredIndustryService $regIndustryService){}

    public function index($id){
        $reqIndustry = $this->reqIndustryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->regIndustryService->create([
                'name' => $reqIndustry->company,
                'act' => $reqIndustry->act,
            ]);
            $this->reqIndustryService->update(
                ['is_active'=>false],
                $reqIndustry
            );
            return response()->json(["message" => "Industry approved successfully.", "data" => RequestIndustryCollection::make($reqIndustry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
