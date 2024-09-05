<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;

class InstituteViewController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute fetched successfully.", "data" => InstituteCollection::make($institute)], 200);
    }
}
