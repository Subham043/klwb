<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqExportController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    /**
     * Export Taluqs data to an Excel file and stream it to the browser.
     *
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */

    public function index(){
        return $this->taluqService->excel()->toBrowser();
    }
}
