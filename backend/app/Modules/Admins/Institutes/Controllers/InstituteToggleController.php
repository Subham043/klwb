<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;
use Illuminate\Support\Facades\DB;

class InstituteToggleController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index(ToggleStatusRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->toggleStatus($institute);
            if($institute->is_active){
                return response()->json(["message" => "Institute unblocked successfully.", "data" => InstituteCollection::make($institute)], 200);
            }
            return response()->json(["message" => "Institute blocked successfully.", "data" => InstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
