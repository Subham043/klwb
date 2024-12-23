<?php

namespace App\Modules\Admins\RegisteredIndustryScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryScholarship\Services\RegisteredIndustryScholarshipService;

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
        $industry = (new RegisteredIndustryService)->getById($id);
        return $this->scholarshipService->excel($industry->reg_industry_id)->toBrowser();
    }
}
