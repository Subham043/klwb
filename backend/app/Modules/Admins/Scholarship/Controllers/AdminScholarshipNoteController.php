<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Requests\AdminNoteScholarshipRequest;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminScholarshipNoteController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Update the admin note of an application.
     *
     * @param AdminNoteScholarshipRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(AdminNoteScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        $application->update([
            'admin_note' => $request->note,
        ]);
        return response()->json(['message' => 'Application note updated successfully.'], 200);
    }
}
