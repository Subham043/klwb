<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Events\RequestInstituteRejected;
use App\Modules\Admins\RequestInstitutes\Requests\RequestInstituteRejectRequest;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteRejectController extends Controller
{
    public function __construct(private RequestInstituteService $reqInstituteService){}

    /**
     * Approve a request of an institute to be added to the system
     *
     * @param int $id The id of the request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(RequestInstituteRejectRequest $request, $id){
        $request->validated();
        $reqInstitute = $this->reqInstituteService->getPendingById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->reqInstituteService->update(
                ['status'=>2, 'reject_reason' => $request->reason],
                $reqInstitute
            );
            RequestInstituteRejected::dispatch($reqInstitute->email ?? null, $reqInstitute->name ?? null, $request->reason);
            return response()->json(["message" => "Institute rejected successfully.", "data" => RequestInstituteCollection::make($reqInstitute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
