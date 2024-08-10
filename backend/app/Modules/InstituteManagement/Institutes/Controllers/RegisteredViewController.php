<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;

class RegisteredViewController extends Controller
{
    private $instituteService;

    public function __construct(InstituteRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Registered fetched successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
    }
}
