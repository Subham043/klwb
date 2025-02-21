<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;

class IndustryScholarshipListController extends Controller
{
    public function __construct(private IndustryScholarshipService $scholarshipService){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index(){
        $application = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return ApplicationCollection::collection($application);
    }
}
