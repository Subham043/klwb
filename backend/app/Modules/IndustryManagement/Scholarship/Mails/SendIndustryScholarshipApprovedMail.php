<?php

namespace App\Modules\IndustryManagement\Scholarship\Mails;

use App\Http\Services\NumberToWordService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class SendIndustryScholarshipApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    private string|null $name;
    private Application $application;
    private mixed $industryPayment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string|null $name, Application $application, mixed $industryPayment)
    {
        $this->name = $name;
        $this->application = $application;
        $this->industryPayment = $industryPayment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mailObj = $this->subject(config('app.name').' - Scholarship application Approved from Industry')->view('emails.scholarship_approved')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to Labour Welfare Board for verification, we will notify the status via sms',
        ]);

        if($this->application->application_state > ApplicationState::Company->value && $this->application->industry->auth && ($this->application->industry->auth->reg_doc_link!=null && $this->application->industry->auth->sign_link!=null && $this->application->industry->auth->seal_link!=null && $this->industryPayment)){
        // if($this->application->application_state > ApplicationState::Company->value && $this->application->industry->auth && ($this->application->industry->auth->reg_doc_link!=null && $this->application->industry->auth->sign_link!=null && $this->application->industry->auth->seal_link!=null && $this->application->industry->auth->gst_link!=null && $this->application->industry->auth->pan_link!=null && $this->industryPayment)){
            $fileName = str()->uuid();
            $data = [
                'application' => $this->application,
                'industryPayment' => $this->industryPayment,
                'msalary_word' => (new NumberToWordService)->convert($this->application->company->msalary)
            ];
            $pdf = Pdf::setOption([
                'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
                'isPhpEnabled' => true, 
                'isRemoteEnabled' => true, 
            ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship_industry_confirmation', $data);
            $pdf->save(storage_path('app/public/attachments/'.$fileName.'.pdf'));

            $mailObj->attach(storage_path('app/public/attachments/'.$fileName.'.pdf'));
        }

        return $mailObj;
    }
}
