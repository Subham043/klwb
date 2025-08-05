<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class GovtScholarshipPdfController extends Controller
{

    public function __construct(private GovtScholarshipService $scholarshipService){}

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
        $pdf = Pdf::setOption([
            'defaultFont' => '"Noto Sans Kannada", "Open Sans", sans-serif', 
            'isPhpEnabled' => true, 
            'isRemoteEnabled' => true, 
        ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship', $data);
        return $pdf->download($fileName.'.pdf');
    }
}
