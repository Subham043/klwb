<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Requests\FeeUpdateRequest;
use App\Modules\Admins\Fees\Resources\FeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeUpdateController extends Controller
{
    public function __construct(private FeeService $feeService){}

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
