<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;

class InstituteScholarshipListController extends Controller
{
    public function __construct(private InstituteScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return ApplicationCollection::collection($application);
    }
}
