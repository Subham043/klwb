<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Govt\Scholarship\Requests\GovtNoteScholarshipRequest;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;

class GovtScholarshipNoteController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index(GovtNoteScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        $application->update([
            'govt_note' => $request->note,
        ]);
        return response()->json(['message' => 'Application note updated successfully.'], 200);
    }
}
