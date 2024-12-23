<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;

class IndustryDeleteController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    /**
     * Delete an Industry.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $industry = $this->industryService->getById($id);

        try {
            //code...
            $this->industryService->delete(
                $industry
            );
            return response()->json(["message" => "Industry deleted successfully.", "data" => IndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
