<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use App\Modules\Admins\Industries\Services\IndustryService;
use Illuminate\Support\Facades\DB;

class RequestIndustryApproveController extends Controller
{
    public function __construct(private RequestIndustryService $reqIndustryService, private IndustryService $industryService){}

    /**
     * Approve a request industry.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $reqIndustry = $this->reqIndustryService->getPendingById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->industryService->create([
                'name' => $reqIndustry->company,
                'act' => $reqIndustry->act,
            ]);
            $this->reqIndustryService->update(
                ['status'=>1],
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
