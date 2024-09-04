<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use Illuminate\Http\Request;

class RegisteredPaginateController extends Controller
{
    public function __construct(private InstituteRegisteredService $instituteService){}

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return InstituteRegisteredCollection::collection($data);
    }

}
