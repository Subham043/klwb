<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Requests\RegisteredUpdateRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use Illuminate\Support\Facades\DB;

class RegisteredUpdateController extends Controller
{
    public function __construct(private InstituteRegisteredService $instituteService){}

    public function index(RegisteredUpdateRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->instituteService->update($request, $institute);
            return response()->json(["message" => "Institute Registered updated successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
