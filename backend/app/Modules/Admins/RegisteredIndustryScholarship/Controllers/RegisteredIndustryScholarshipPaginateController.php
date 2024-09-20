<?php

namespace App\Modules\Admins\RegisteredIndustryScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryScholarship\Resources\RegisteredIndustryScholarshipCollection;
use App\Modules\Admins\RegisteredIndustryScholarship\Services\RegisteredIndustryScholarshipService;
use Illuminate\Http\Request;

class RegisteredIndustryScholarshipPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryScholarshipService $scholarshipService){}

    public function index(Request $request, $id){
        $industry = (new RegisteredIndustryService)->getById($id);
        $data = $this->scholarshipService->paginate($industry->reg_industry_id, $request->total ?? 10);
        return RegisteredIndustryScholarshipCollection::collection($data);
    }

}
