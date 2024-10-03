<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Govt\Scholarship\Resources\GovtApplicationCollection;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;

class GovtScholarshipListController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return GovtApplicationCollection::collection($application);
    }
}
