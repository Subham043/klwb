<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Requests\AdminScholarshipIndustryUpdateRequest;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use Illuminate\Support\Facades\DB;

class AdminScholarshipIndustryUpdateController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Reject a scholarship application.
     *
     * @param AdminScholarshipIndustryUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(AdminScholarshipIndustryUpdateRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $application->update([
                'company_id' => $request->company_id,
            ]);
            $application->company->update([
                'district_id' => $request->district_id,
			    'taluq_id' => $request->taluq_id,
            ]);
            return response()->json(["message" => "Application updated successfully."], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
