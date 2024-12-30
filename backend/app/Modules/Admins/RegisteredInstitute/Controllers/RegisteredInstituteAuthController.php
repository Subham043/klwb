<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Requests\RegisteredInstituteAuthRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteAuthController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Update the institute auth details.
     *
     * @param RegisteredInstituteAuthRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(RegisteredInstituteAuthRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->instituteService->updateAuth([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ], $institute);
            return response()->json(["message" => "Institute Registered updated successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
