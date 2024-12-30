<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Http\Request;

class FeePaginateController extends Controller
{

    public function __construct(private FeeService $feeService){}

    /**
     * Returns a paginated collection of fees.
     *
     * @param Request $request
     * @return ExtendedFeeCollection
     */
    public function index(Request $request){
        $data = $this->feeService->paginate($request->total ?? 10);
        return ExtendedFeeCollection::collection($data);
    }

}
