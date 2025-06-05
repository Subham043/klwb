<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\CourseManagement\Graduations\Exports\GraduationExport;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class GraduationExportController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * Export graduation data to a browser-friendly format.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new GraduationExport($this->graduationService->getExcelQuery()), 'graduations.xlsx') : abort(403);
        // return Excel::download(new GraduationExport($this->graduationService->getExcelQuery()), 'graduations.xlsx');
    }
}
