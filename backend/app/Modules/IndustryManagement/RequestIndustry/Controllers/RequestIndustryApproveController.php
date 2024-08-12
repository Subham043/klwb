<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustrys\Services\RegisteredIndustryService;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryApproveController extends Controller
{
    private $reqIndustryService;
    private $regIndustryService;

    public function __construct(RequestIndustryService $reqIndustryService, RegisteredIndustryService $regIndustryService)
    {
        $this->reqIndustryService = $reqIndustryService;
        $this->regIndustryService = $regIndustryService;
    }

    public function index($id){
        $reqIndustry = $this->reqIndustryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->regIndustryService->create([
                'name' => $reqIndustry->name.', '.$reqIndustry->address.', '.$reqIndustry->pincode,
                'taluq_id' => $reqIndustry->taluq_id,
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
