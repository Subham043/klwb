<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;
use App\Modules\InstituteManagement\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteApproveController extends Controller
{
    public function __construct(private RequestInstituteService $reqInstituteService, private RegisteredInstituteService $regInstituteService){}

    public function index($id){
        $reqInstitute = $this->reqInstituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->regInstituteService->create([
                'name' => $reqInstitute->name.', '.$reqInstitute->address.', '.$reqInstitute->pincode,
                'taluq_id' => $reqInstitute->taluq_id,
            ]);
            $this->reqInstituteService->update(
                ['is_active'=>false],
                $reqInstitute
            );
            return response()->json(["message" => "Institute approved successfully.", "data" => RequestInstituteCollection::make($reqInstitute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
