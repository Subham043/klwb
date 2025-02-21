<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Requests\AdminScholarshipInstituteUpdateRequest;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use Illuminate\Support\Facades\DB;

class AdminScholarshipInstituteUpdateController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Reject a scholarship application.
     *
     * @param AdminScholarshipInstituteUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(AdminScholarshipInstituteUpdateRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $application->update([
                'school_id' => $request->school_id,
            ]);
            $application->mark->update([
                'ins_district_id' => $request->ins_district_id,
			    'ins_taluq_id' => $request->ins_taluq_id,
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
