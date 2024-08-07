<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Resources\FeeCollection;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;

class FeeViewController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index($id){
        $fee = $this->feeService->getById($id);
        return response()->json(["message" => "Fee fetched successfully.", "data" => FeeCollection::make($fee)], 200);
    }
}
