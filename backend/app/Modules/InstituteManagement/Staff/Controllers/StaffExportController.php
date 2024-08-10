<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Staff\Exports\StaffExport;
use App\Modules\InstituteManagement\Staff\Services\InstituteStaffService;
use Maatwebsite\Excel\Facades\Excel;

class StaffExportController extends Controller
{
    private $staffService;

    public function __construct(InstituteStaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index($id){
        $school = (new InstituteRegisteredService)->getById($id);
        $data = $this->staffService->all($school->profile->school_id, $school->profile->id);
        return Excel::download(new StaffExport($data), 'registered_institute_staffs.xlsx');
    }
}
