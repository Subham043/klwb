<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Requests\IndustryRequest;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;
use Illuminate\Support\Facades\DB;

class IndustryCreateController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    /**
     * Handles the creation of a new industry.
     *
     * @param IndustryRequest $request The request object containing industry data.
     * @return \Illuminate\Http\JsonResponse JSON response indicating success or failure.
     */

    public function index(IndustryRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $industry = $this->industryService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Industry created successfully.", "data" => IndustryCollection::make($industry)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
