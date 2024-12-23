<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Requests\ApplicationDateUpdateRequest;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Support\Facades\DB;

class ApplicationDateUpdateController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Update an existing ApplicationDate.
     * 
     * @param ApplicationDateUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ApplicationDateUpdateRequest $request, $id){
        $applicationDate = $this->applicationDateService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->applicationDateService->update(
                $request->validated(),
                $applicationDate
            );
            return response()->json(["message" => "Application Date updated successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
