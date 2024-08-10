<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Requests\RegisteredInstituteRequest;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteUpdateController extends Controller
{
    private $instituteService;

    public function __construct(RegisteredInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(RegisteredInstituteRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->update(
                $request->validated(),
                $institute
            );
            $taluq = (new TaluqService)->getById($request->taluq_id);
            $institute->registration->profile->update([
                'is_blocked' => !$request->is_active,
            ]);
            $institute->registration->address->update([
                'taluq_id' => $taluq->id,
                'city_id' => $taluq->city->id,
                'state_id' => $taluq->city->state->id,
            ]);
            return response()->json(["message" => "Registered Institute updated successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
