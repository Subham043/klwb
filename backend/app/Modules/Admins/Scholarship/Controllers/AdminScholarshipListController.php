<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Resources\AdminApplicationCollection;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminScholarshipListController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Show the list of scholarship applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $data = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return AdminApplicationCollection::collection($data);
    }
}
