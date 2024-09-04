<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Http\Request;

class CityPaginateController extends Controller
{
    public function __construct(private CityService $cityService){}

    public function index(Request $request){
        $data = $this->cityService->paginate($request->total ?? 10);
        return CityCollection::collection($data);
    }

}
