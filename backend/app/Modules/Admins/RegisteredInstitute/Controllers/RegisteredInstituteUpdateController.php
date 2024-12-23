<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Requests\RegisteredInstituteUpdateRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteUpdateController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Update the specified registered institute.
     *
     * @param RegisteredInstituteUpdateRequest $request The request object containing validated data.
     * @param int $id The ID of the institute to be updated.
     * @return \Illuminate\Http\JsonResponse A response indicating success or failure of the update operation.
     */

    public function index(RegisteredInstituteUpdateRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->instituteService->update($request, $institute);
            return response()->json(["message" => "Institute Registered updated successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
