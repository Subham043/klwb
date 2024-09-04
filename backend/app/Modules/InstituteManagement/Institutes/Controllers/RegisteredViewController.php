<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;

class RegisteredViewController extends Controller
{
    public function __construct(private InstituteRegisteredService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Registered fetched successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
    }
}
