<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\NumberToWordService;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;
use Barryvdh\DomPDF\Facade\Pdf;

class GovtScholarshipIndustryConfirmationPdfController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    /**
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    
    public function index($id){
        $application = $this->scholarshipService->getById($id);
        if($application->industry->auth && ($application->industry->auth->reg_doc_link!=null && $application->industry->auth->sign_link!=null && $application->industry->auth->seal_link!=null && $application->industry->auth->gst_link!=null && $application->industry->auth->pan_link!=null && $application->industryPayment)){
            $fileName = str()->uuid();
            $data = [
                'application' => $application,
                'industryPayment' => $application->industryPayment,
                'msalary_word' => (new NumberToWordService)->convert($application->company->msalary)
            ];
            // return view('pdf.scholarship', compact(['application']));
            $pdf = Pdf::setOption([
                'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
                'isPhpEnabled' => true, 
                'isRemoteEnabled' => true, 
            ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship_industry_confirmation', $data);
            return $pdf->download($fileName.'.pdf');
        }
        abort(404);
    }
}
