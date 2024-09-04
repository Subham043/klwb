<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Requests\RegisteredUpdateRequest;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Industry\Resources\SingleIndustryAuthCollection;
use Illuminate\Support\Facades\DB;

class RegisteredUpdateController extends Controller
{
    public function __construct(private IndustryRegisteredService $industryService){}

    public function index(RegisteredUpdateRequest $request, $id){
        $industry = $this->industryService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->industryService->update($request, $industry);
            return response()->json(["message" => "Industry Registered updated successfully.", "data" => SingleIndustryAuthCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
