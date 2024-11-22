<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Resources\FinanceApplicationCollection;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceScholarshipListController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    public function index(){
        $application = $this->scholarshipService->getList();
        return FinanceApplicationCollection::collection($application);
    }
}
