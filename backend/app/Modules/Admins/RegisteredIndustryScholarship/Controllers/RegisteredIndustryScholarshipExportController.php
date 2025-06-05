<?php

namespace App\Modules\Admins\RegisteredIndustryScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryScholarship\Services\RegisteredIndustryScholarshipService;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredIndustryScholarshipExportController extends Controller
{
    public function __construct(private RegisteredIndustryScholarshipService $scholarshipService){}

    /**
     * Download excel file containing all applications related to the given industry.
     *
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index($id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        $industry = (new RegisteredIndustryService)->getById($id);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery($industry->reg_industry_id)), 'applications.xlsx') : abort(403);
        // return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery($industry->reg_industry_id)), 'applications.xlsx');
    }
}
