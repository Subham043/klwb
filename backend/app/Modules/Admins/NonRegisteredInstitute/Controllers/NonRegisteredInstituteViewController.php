<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;
use App\Modules\Admins\NonRegisteredInstitute\Resources\NonRegisteredInstituteCollection;

class NonRegisteredInstituteViewController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

/**
 * Fetch a non-registered institute by its ID.
 *
 * @param int|string $id The ID of the non-registered institute to retrieve.
 * @return \Illuminate\Http\JsonResponse JSON response containing the institute data.
 */

    public function index($id){
        $institute = $this->instituteService->getById($id);
        return response()->json(["message" => "Institute Non Registered fetched successfully.", "data" => NonRegisteredInstituteCollection::make($institute)], 200);
    }
}
