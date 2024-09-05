<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;
use Illuminate\Http\Request;

class InstitutePaginateController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return InstituteCollection::collection($data);
    }

}
