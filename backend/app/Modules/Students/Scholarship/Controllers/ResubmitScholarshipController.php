<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Requests\ResubmitScholarshipRequest;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Illuminate\Support\Facades\DB;

class ResubmitScholarshipController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index(ResubmitScholarshipRequest $request){
        $application = $this->scholarshipService->getLatest();
        if($this->applicationChecks->isEligibleForScholarship() && !$this->applicationChecks->canResubmit($application)){
            return response()->json(["message" => "You can not resubmit as application is not open yet."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $request->validated();
            $this->scholarshipService->resubmit($request, $application);
            return response()->json(["message" => "Scholarship applied successfully."], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
