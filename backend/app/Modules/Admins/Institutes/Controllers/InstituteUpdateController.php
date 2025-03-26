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

    /**
     * Update the specified Institute.
     *
     * @param InstituteRequest $request The request containing validated data for updating the institute.
     * @param int $id The ID of the institute to be updated.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure of the update.
     *
     * This method retrieves an institute by ID, begins a database transaction, and attempts to update
     * the institute's details and address using the provided request data. If the update is successful,
     * a success message and the updated institute data are returned. If an error occurs, the transaction
     * is rolled back, and an error message is returned.
     */

    public function index(InstituteRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->update(
                [
                    'name' => $request->name, 
                    'taluq_id' => $request->taluq_id, 
                    'management_type' => $request->management_type ? $request->management_type : null, 
                    'category' => $request->category ? $request->category : null, 
                    'type' => $request->type ? $request->type : null, 
                    'urban_rural' => $request->urban_rural ? $request->urban_rural : null,
                ],
                $institute
            );
            $taluq = (new TaluqService)->getById($request->taluq_id);
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
