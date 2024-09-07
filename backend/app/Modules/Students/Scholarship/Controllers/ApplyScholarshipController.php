<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use App\Modules\Students\Scholarship\Requests\ApplyScholarshipRequest;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Illuminate\Support\Facades\DB;

class ApplyScholarshipController extends Controller
{

    public function __construct(private ScholarshipService $scholarshipService, private ApplicationDateService $applicationDateService){}

    public function index(ApplyScholarshipRequest $request){
        $areScholarshipApplicationOpen = $this->applicationDateService->areScholarshipApplicationOpen();
        if (!$areScholarshipApplicationOpen) {
            return response()->json(["message" => "You can not apply for scholarship as application is not open yet."], 400);
        }
        if(!$this->scholarshipService->isEligibleForScholarship()){
            return response()->json(["message" => "You have already applied scholarship for this year"], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $request->validated();
            $this->scholarshipService->apply($request);
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
