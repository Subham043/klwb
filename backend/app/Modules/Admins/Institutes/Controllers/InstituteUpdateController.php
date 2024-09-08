<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Requests\InstituteRequest;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Support\Facades\DB;

class InstituteUpdateController extends Controller
{
    public function __construct(private InstituteService $instituteService, private InstituteAuthService $instituteAuthService){}

    public function index(InstituteRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->update(
                $request->validated(),
                $institute
            );
            $taluq = (new TaluqService)->getById($request->taluq_id);
            $this->instituteAuthService->update([
                'is_blocked' => !$request->is_active,
            ], $institute->auth->profile);
            $this->instituteAuthService->updateInstituteAddress([
                'taluq_id' => $taluq->id,
                'city_id' => $taluq->city->id,
                'state_id' => $taluq->city->state->id,
            ], $institute->auth->address);
            return response()->json(["message" => "Institute updated successfully.", "data" => InstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
