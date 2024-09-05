<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;

class IndustryViewController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Industry fetched successfully.", "data" => IndustryCollection::make($industry)], 200);
    }
}
