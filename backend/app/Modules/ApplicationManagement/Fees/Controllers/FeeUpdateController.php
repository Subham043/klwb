<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Requests\FeeUpdateRequest;
use App\Modules\ApplicationManagement\Fees\Resources\FeeCollection;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;

class FeeUpdateController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(FeeUpdateRequest $request, $id){
        $fee = $this->feeService->getById($id);
        try {
            //code...
            $this->feeService->update(
                $request->validated(),
                $fee
            );
            return response()->json(["message" => "Fee updated successfully.", "data" => FeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
