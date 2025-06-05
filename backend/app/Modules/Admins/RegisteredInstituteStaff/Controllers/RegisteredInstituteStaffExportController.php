<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

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
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        $school = $this->instituteService->getById($id);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new EmployeeExport($this->staffService->getExcelQuery($school->profile->school_id, $school->profile->id)), 'institute_staffs.xlsx') : abort(403);
        // return Excel::download(new EmployeeExport($this->staffService->getExcelQuery($school->profile->school_id, $school->profile->id)), 'institute_staffs.xlsx');
    }
}
