<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class ScholarshipInstituteConfirmationPdfController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService){}

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
