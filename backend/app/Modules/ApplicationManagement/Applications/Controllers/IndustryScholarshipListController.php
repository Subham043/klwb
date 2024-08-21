<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Resources\Scholarship\ApplicationCollection;
use App\Modules\ApplicationManagement\Applications\Services\IndustryScholarshipService;

class IndustryScholarshipListController extends Controller
{
    private $scholarshipService;

    public function __construct(IndustryScholarshipService $scholarshipService)
    {
        $this->scholarshipService = $scholarshipService;
    }

    public function index(){
        $application = $this->scholarshipService->getList();
        return ApplicationCollection::collection($application);
    }
}
