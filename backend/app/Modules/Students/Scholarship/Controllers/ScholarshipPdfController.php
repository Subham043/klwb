<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class ScholarshipPdfController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService){}

    public function index($id){
        $application = $this->scholarshipService->getById($id);
        $fileName = str()->uuid();
        $data = [
            'application' => $application
        ];
        // return view('pdf.scholarship', compact(['application']));
        $pdf = Pdf::loadView('pdf.scholarship', $data)->setPaper('a4', 'potrait');
        return $pdf->download($fileName.'.pdf');
    }
}
