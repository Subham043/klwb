<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Requests\RegisteredUpdateRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Support\Facades\DB;

class RegisteredUpdateController extends Controller
{
    private $instituteService;

    public function __construct(InstituteRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(RegisteredUpdateRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $institute->update([
                'principal' => $request->principal,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);
            $taluq = (new TaluqService)->getById($request->taluq_id);
            $institute->address->update([
                'taluq_id' => $taluq->id,
                'city_id' => $taluq->city->id,
                'state_id' => $taluq->city->state->id,
                'address' => $request->address,
                'pincode' => $request->pincode,
            ]);
            $institute->registered_institute->update([
                'taluq_id' => $taluq->id,
                'name' => $request->name,
                'management_type' => $request->management_type,
                'category' => $request->category,
                'type' => $request->type,
                'urban_rural' => $request->urban_rural,
                'is_active' => $request->is_active,
            ]);
            $institute->profile->update([
                'is_blocked' => !$request->is_active,
            ]);
            $institute->refresh();
            return response()->json(["message" => "Institute Registered updated successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
