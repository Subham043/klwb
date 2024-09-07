<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class ScholarshipListController extends Controller
{

    public function __construct(private ScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return ApplicationCollection::collection($application);
    }
}
