<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Resources\FeeCollection;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;
use Illuminate\Http\Request;

class FeePaginateController extends Controller
{

    public function __construct(private FeeService $feeService){}

    public function index(Request $request){
        $data = $this->feeService->paginate($request->total ?? 10);
        return FeeCollection::collection($data);
    }

}
