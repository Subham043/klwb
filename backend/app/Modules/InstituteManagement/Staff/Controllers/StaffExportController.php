<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Staff\Services\InstituteStaffService;

class StaffExportController extends Controller
{
    private $staffService;

    public function __construct(InstituteStaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index($id){
        $school = (new InstituteRegisteredService)->getById($id);
        return $this->staffService->excel($school->profile->school_id, $school->profile->id)->toBrowser();
    }
}
