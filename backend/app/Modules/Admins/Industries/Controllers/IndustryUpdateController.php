<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Requests\IndustryRequest;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;
use Illuminate\Support\Facades\DB;

class IndustryUpdateController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    public function index(IndustryRequest $request, $id){
        $industry = $this->industryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->industryService->update(
                $request->validated(),
                $industry
            );
            return response()->json(["message" => "Industry updated successfully.", "data" => IndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
