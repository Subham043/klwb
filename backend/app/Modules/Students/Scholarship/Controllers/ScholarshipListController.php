<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class ScholarshipListController extends Controller
{

    public function __construct(private ScholarshipService $scholarshipService){}

    /**
     * Show the list of scholarships applied by the logged in user
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $application = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return ApplicationCollection::collection($application);
    }
}
