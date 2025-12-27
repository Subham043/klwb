<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Resources\AdminNonRegisteredApplicationCollection;
use App\Modules\Admins\Scholarship\Services\AdminNonRegisteredScholarshipService;

class AdminNonRegisteredScholarshipListController extends Controller
{
    public function __construct(private AdminNonRegisteredScholarshipService $scholarshipService){}

    /**
     * Show the list of scholarship applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $data = $this->scholarshipService->getList(request()->query('total') ?? 10);
        return AdminNonRegisteredApplicationCollection::collection($data);
    }
}
