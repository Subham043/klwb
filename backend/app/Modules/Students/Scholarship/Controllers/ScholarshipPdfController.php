<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class ScholarshipPdfController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService){}

    /**
     * Downloads a PDF of a given scholarship application
     * 
     * @param int $id the ID of the application
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $application = $this->scholarshipService->getById($id);
        $fileName = str()->uuid();
        $data = [
            'application' => $application
        ];
        // return view('pdf.scholarship', compact(['application']));
        $pdf = Pdf::setOption([
            'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
            'isPhpEnabled' => true, 
            'isRemoteEnabled' => true, 
        ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship', $data);
        return $pdf->download($fileName.'.pdf');
    }
}
