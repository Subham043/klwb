<?php

namespace App\Modules\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Fees\Resources\FeeCollection;
use App\Modules\Fees\Services\FeeService;

class FeeDeleteController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index($id){
        $fee = $this->feeService->getById($id);

        try {
            //code...
            $this->feeService->delete(
                $fee
            );
            return response()->json(["message" => "Fee deleted successfully.", "data" => FeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}