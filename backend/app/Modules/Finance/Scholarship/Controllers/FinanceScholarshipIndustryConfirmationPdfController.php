<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\NumberToWordService;
use App\Http\Services\ScholarshipHelperService;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use Barryvdh\DomPDF\Facade\Pdf;

class FinanceScholarshipIndustryConfirmationPdfController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    
    public function index($id){
        $applicationMain = $this->scholarshipService->getById($id);
        $application = (new ScholarshipHelperService)->industryPaymentWrapper($applicationMain);
        if($application->application_state > ApplicationState::Company->value && $application->industry->auth && ($application->industry->auth->reg_doc_link!=null && $application->industry->auth->sign_link!=null && $application->industry->auth->seal_link!=null && $application->industryPaymentInfo)){
        // if($application->application_state > ApplicationState::Company->value && $application->industry->auth && ($application->industry->auth->reg_doc_link!=null && $application->industry->auth->sign_link!=null && $application->industry->auth->seal_link!=null && $application->industry->auth->gst_link!=null && $application->industry->auth->pan_link!=null && $application->industryPaymentInfo)){
            $fileName = str()->uuid();
            $data = [
                'application' => $application,
                'industryPayment' => $application->industryPaymentInfo,
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
