<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Govt\Scholarship\Resources\GovtApplicationCollection;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;

class GovtScholarshipListController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    /**
     * Display a listing of the scholarship applications.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function index(){
        $application = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return GovtApplicationCollection::collection($application);
    }
}
