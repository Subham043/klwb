<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Institutes\Exports\InstituteExport;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class NonRegisteredInstituteExportController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

    /**
     * Download excel file containing all non-registered institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new InstituteExport($this->instituteService->getExcelQuery()), 'non_registered_institutes.xlsx') : abort(403);
        // return Excel::download(new InstituteExport($this->instituteService->getExcelQuery()), 'non_registered_institutes.xlsx');
    }
}
