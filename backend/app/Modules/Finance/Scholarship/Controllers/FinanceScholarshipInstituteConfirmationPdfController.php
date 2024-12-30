<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class FinanceScholarshipInstituteConfirmationPdfController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Generates and downloads a PDF confirmation document for a scholarship institute application.
     *
     * This method retrieves the scholarship application by its ID, verifies the necessary
     * authentication links are present for the associated institute, and generates a PDF
     * document using a predefined template. The PDF is then downloaded with a unique filename.
     * If the necessary authentication links are not present, a 404 error is triggered.
     *
     * @param int $id The ID of the scholarship application.
     * @return \Symfony\Component\HttpFoundation\Response The PDF download response.
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException If the application does not meet the required conditions.
     */

    public function index($id){
        $application = $this->scholarshipService->getById($id);
        if($application->institute->auth && ($application->institute->auth->reg_certification_link!=null && $application->institute->auth->principal_signature_link!=null && $application->institute->auth->seal_link!=null)){
            $fileName = str()->uuid();
            $data = [
                'application' => $application
            ];
            // return view('pdf.scholarship', compact(['application']));
            $pdf = Pdf::setOption([
                'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
                'isPhpEnabled' => true, 
                'isRemoteEnabled' => true, 
            ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship_institute_confirmation', $data);
            return $pdf->download($fileName.'.pdf');
        }
        abort(404);
    }
}
