<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Services\InstituteService;
use App\Modules\Admins\RequestInstitutes\Events\RequestInstituteApproved;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteApproveController extends Controller
{
    public function __construct(private RequestInstituteService $reqInstituteService, private InstituteService $instituteService){}

    /**
     * Approve a request of an institute to be added to the system
     *
     * @param int $id The id of the request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $reqInstitute = $this->reqInstituteService->getPendingById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->create([
                'name' => $reqInstitute->name.', '.$reqInstitute->address.', '.$reqInstitute->pincode,
                'taluq_id' => $reqInstitute->taluq_id,
            ]);
            $this->reqInstituteService->update(
                ['status'=>1],
                $reqInstitute
            );
            RequestInstituteApproved::dispatch($reqInstitute->email ?? null, $reqInstitute->name ?? null);
            return response()->json(["message" => "Institute approved successfully.", "data" => RequestInstituteCollection::make($reqInstitute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
