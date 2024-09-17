<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteScholarship\Services\RegisteredInstituteScholarshipService;

class RegisteredInstituteScholarshipExportController extends Controller
{
    public function __construct(private RegisteredInstituteScholarshipService $staffService, private RegisteredInstituteService $instituteService){}

    public function index($id){
        $school = $this->instituteService->getById($id);
        return $this->staffService->excel($school->reg_institute_id)->toBrowser();
    }
}
