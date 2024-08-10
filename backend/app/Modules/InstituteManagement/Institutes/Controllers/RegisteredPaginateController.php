<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use Illuminate\Http\Request;

class RegisteredPaginateController extends Controller
{
    private $instituteService;

    public function __construct(InstituteRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return InstituteRegisteredCollection::collection($data);
    }

}
