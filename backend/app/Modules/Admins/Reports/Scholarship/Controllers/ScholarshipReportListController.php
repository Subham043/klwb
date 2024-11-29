<?php

namespace App\Modules\Admins\Reports\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Scholarship\Resources\ScholarshipReportCollection;
use App\Modules\Admins\Reports\Scholarship\Services\AdminScholarshipService;

class ScholarshipReportListController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return ScholarshipReportCollection::collection($application);
    }
}
