<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Exports\TaluqExport;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Maatwebsite\Excel\Facades\Excel;

class TaluqExportController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(){
        $data = $this->taluqService->all();
        return Excel::download(new TaluqExport($data), 'taluqs.xlsx');
    }
}
