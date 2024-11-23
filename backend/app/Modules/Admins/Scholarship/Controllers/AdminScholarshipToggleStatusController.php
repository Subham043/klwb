<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use Illuminate\Support\Facades\DB;

class AdminScholarshipToggleStatusController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index(ToggleStatusRequest $request, $id){
        $application = $this->scholarshipService->getById($id);
        DB::beginTransaction();
        try {
            if($application->inactive){
                $application->update([
                    'inactive' => false,
                ]);
                return response()->json(["message" => "Application Unblocked successfully."], 200);
            }
            $application->update([
                'inactive' => true,
            ]);
            return response()->json(["message" => "Application Blocked successfully."], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
