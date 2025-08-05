<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminScholarshipPdfController extends Controller
{

    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Generates a PDF for the scholarship application and initiates a download.
     *
     * @param int|string $id The unique identifier for the scholarship application.
     * @return \Illuminate\Http\Response The response containing the downloadable PDF file.
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
