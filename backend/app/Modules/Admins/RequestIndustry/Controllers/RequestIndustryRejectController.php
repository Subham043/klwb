<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Events\RequestIndustryRejected;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use App\Modules\Admins\RequestIndustry\Requests\RequestIndustryRejectRequest;
use Illuminate\Support\Facades\DB;

class RequestIndustryRejectController extends Controller
{
    public function __construct(private RequestIndustryService $reqIndustryService){}

    /**
     * Approve a request industry.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(RequestIndustryRejectRequest $request, $id){
        $reqIndustry = $this->reqIndustryService->getPendingById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->reqIndustryService->update(
                ['status'=>2, 'reject_reason' => $request->reason],
                $reqIndustry
            );
            RequestIndustryRejected::dispatch($reqIndustry->email ?? null, $reqIndustry->company ?? null, $request->reason);
            return response()->json(["message" => "Industry approved successfully.", "data" => RequestIndustryCollection::make($reqIndustry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
