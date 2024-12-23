<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteScholarship\Services\RegisteredInstituteScholarshipService;

class RegisteredInstituteScholarshipExportController extends Controller
{
    public function __construct(private RegisteredInstituteScholarshipService $scholarshipService, private RegisteredInstituteService $instituteService){}

    /**
     * Download an Excel file with all scholarships for the given registered institute.
     * @param int $id The registered institute ID.
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index($id){
        $school = $this->instituteService->getById($id);
        return $this->scholarshipService->excel($school->reg_institute_id)->toBrowser();
    }
}
