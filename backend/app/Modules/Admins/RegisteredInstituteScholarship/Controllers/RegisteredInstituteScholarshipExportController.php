<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteScholarship\Services\RegisteredInstituteScholarshipService;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteScholarshipExportController extends Controller
{
    public function __construct(private RegisteredInstituteScholarshipService $scholarshipService, private RegisteredInstituteService $instituteService){}

    /**
     * Download an Excel file with all scholarships for the given registered institute.
     * @param int $id The registered institute ID.
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index($id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        $school = $this->instituteService->getById($id);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery($school->reg_institute_id)), 'applications.xlsx') : abort(403);
        // return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery($school->reg_institute_id)), 'applications.xlsx');
    }
}
