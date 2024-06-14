<?php

namespace App\Modules\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Cities\Resources\CityCollection;
use App\Modules\Cities\Services\CityService;
use Illuminate\Http\Request;

class CityPaginateController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(Request $request){
        $data = $this->cityService->paginate($request->total ?? 10);
        return CityCollection::collection($data);
    }

}