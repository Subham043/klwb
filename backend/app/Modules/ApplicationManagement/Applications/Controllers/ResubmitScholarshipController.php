<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use App\Modules\ApplicationManagement\Applications\Requests\ResubmitScholarshipRequest;
use App\Modules\ApplicationManagement\Applications\Services\ScholarshipService;
use Illuminate\Support\Facades\DB;

class ResubmitScholarshipController extends Controller
{
    private $scholarshipService;
    private $applicationDateService;

    public function __construct(ScholarshipService $scholarshipService, ApplicationDateService $applicationDateService)
    {
        $this->scholarshipService = $scholarshipService;
        $this->applicationDateService = $applicationDateService;
    }

    public function index(ResubmitScholarshipRequest $request){
        $areScholarshipApplicationOpen = $this->applicationDateService->areScholarshipApplicationOpen();
        if (!$areScholarshipApplicationOpen) {
            return response()->json(["message" => "You can not resubmit as application is not open yet."], 400);
        }
        $application = (new ScholarshipService)->getLatest();
        if($this->scholarshipService->isEligibleForScholarship() && !$this->scholarshipService->canResubmit($application)){
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
