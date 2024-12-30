<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;

class RegisteredInstituteViewController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Get a single registered institute by id.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Registered fetched successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
    }
}
