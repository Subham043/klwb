<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteDeleteController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Delete a Request Institute
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function index($id){
        $institute = $this->instituteService->getById($id);

        try {
            //code...
            $this->instituteService->delete(
                $institute
            );
            return response()->json(["message" => "Request Institute deleted successfully.", "data" => RequestInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
