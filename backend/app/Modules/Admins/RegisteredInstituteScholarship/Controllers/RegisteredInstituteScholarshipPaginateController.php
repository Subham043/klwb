<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteScholarship\Resources\RegisteredInstituteScholarshipCollection;
use App\Modules\Admins\RegisteredInstituteScholarship\Services\RegisteredInstituteScholarshipService;
use Illuminate\Http\Request;

class RegisteredInstituteScholarshipPaginateController extends Controller
{
    public function __construct(private RegisteredInstituteScholarshipService $scholarshipService, private RegisteredInstituteService $instituteService){}

    /**
     * Retrieve a paginated list of scholarships registered under the given registered institute.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id){
        $school = $this->instituteService->getById($id);
        $data = $this->scholarshipService->paginate($school->reg_institute_id, $request->total ?? 10);
        return RegisteredInstituteScholarshipCollection::collection($data);
    }

}
