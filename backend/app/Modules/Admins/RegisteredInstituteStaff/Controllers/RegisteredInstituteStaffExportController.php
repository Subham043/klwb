<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;

class RegisteredInstituteStaffExportController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

    /**
     * Download an Excel file containing all the staff associated with the given institute.
     *
     * @param int $id The ID of the institute
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index($id){
        $school = $this->instituteService->getById($id);
        return $this->staffService->excel($school->profile->school_id, $school->profile->id)->toBrowser();
    }
}
