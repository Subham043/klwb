<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Resources\AdminApplicationCollection;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminScholarshipListController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return AdminApplicationCollection::collection($application);
    }
}
