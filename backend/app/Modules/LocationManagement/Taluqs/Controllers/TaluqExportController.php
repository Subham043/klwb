<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Exports\TaluqExport;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Maatwebsite\Excel\Facades\Excel;

class TaluqExportController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    /**
     * Export Taluqs data to an Excel file and stream it to the browser.
     *
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new TaluqExport($this->taluqService->getExcelQuery()), 'taluqs.xlsx');
    }
}
