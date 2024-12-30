<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;

class IndustryAllController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index(){
        $industry = $this->industryService->all();
        return response()->json(["message" => "Industry fetched successfully.", "data" => IndustryCollection::collection($industry)], 200);
    }
}
