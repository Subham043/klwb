<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;

class RegisteredInstituteDeleteController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);

        try {
            //code...
            $this->instituteService->delete(
                $institute
            );
            return response()->json(["message" => "Registered Institute deleted successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
