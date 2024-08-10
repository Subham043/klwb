<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;

class NonRegisteredViewController extends Controller
{
    private $instituteService;

    public function __construct(InstituteNonRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Non Registered fetched successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
    }
}
