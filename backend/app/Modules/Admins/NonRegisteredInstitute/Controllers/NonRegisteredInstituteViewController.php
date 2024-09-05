<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;
use App\Modules\Admins\NonRegisteredInstitute\Resources\NonRegisteredInstituteCollection;

class NonRegisteredInstituteViewController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Non Registered fetched successfully.", "data" => NonRegisteredInstituteCollection::make($institute)], 200);
    }
}
