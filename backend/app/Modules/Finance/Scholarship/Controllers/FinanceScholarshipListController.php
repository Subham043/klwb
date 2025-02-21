<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Resources\FinanceApplicationCollection;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceScholarshipListController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Returns a list of applications.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $application = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return FinanceApplicationCollection::collection($application);
    }
}
