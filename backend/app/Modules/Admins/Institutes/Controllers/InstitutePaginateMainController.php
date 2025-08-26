<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteMainService;
use Illuminate\Http\Request;

class InstitutePaginateMainController extends Controller
{
    public function __construct(private InstituteMainService $instituteService){}

    /**
     * Get a paginated list of Institutes.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->instituteService->paginate($request->total ?? 10);
        return InstituteCollection::collection($data);
    }

}
