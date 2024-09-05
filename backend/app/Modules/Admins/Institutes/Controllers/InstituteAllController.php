<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;

class InstituteAllController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index(){
        $institute = $this->instituteService->all();
        return response()->json(["message" => "Institute fetched successfully.", "data" => InstituteCollection::collection($institute)], 200);
    }
}
