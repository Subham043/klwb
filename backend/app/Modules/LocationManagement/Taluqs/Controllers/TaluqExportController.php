<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Exports\TaluqExport;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TaluqExportController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(Request $request){
        $data = $this->taluqService->all($request->city_id ?? null);
        return Excel::download(new TaluqExport($data), 'taluqs.xlsx');
    }
}
