<?php

namespace App\Modules\Admins\NonRegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Industries\Exports\IndustryExport;
use App\Modules\Admins\NonRegisteredIndustry\Services\NonRegisteredIndustryService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class NonRegisteredIndustryExportController extends Controller
{
    public function __construct(private NonRegisteredIndustryService $industryService){}

    /**
     * Downloads an Excel file containing all non-registered industries.
     *
     * @return \Spatie\SimpleExcel\SimpleExcelWriter
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new IndustryExport($this->industryService->getExcelQuery()), 'non_registered_industries.xlsx') : abort(403);
        // return Excel::download(new IndustryExport($this->industryService->getExcelQuery()), 'non_registered_industries.xlsx');
    }
}
