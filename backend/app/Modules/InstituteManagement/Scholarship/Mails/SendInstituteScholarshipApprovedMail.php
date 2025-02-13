<?php

namespace App\Modules\InstituteManagement\Scholarship\Mails;

use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class SendInstituteScholarshipApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    private string|null $name;
    private Application $application;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string|null $name, Application $application)
    {
        $this->name = $name;
        $this->application = $application;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mailObj = $this->subject(config('app.name').' - Scholarship application Approved from Institute')->view('emails.scholarship_approved')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to Industry for verification, we will notify the status via sms',
        ]);
        
        if($this->application->application_state > ApplicationState::School->value && $this->application->institute->auth && ($this->application->institute->auth->reg_certification_link!=null && $this->application->institute->auth->principal_signature_link!=null && $this->application->institute->auth->seal_link!=null)){
            $fileName = str()->uuid();
            $data = [
                'application' => $this->application
            ];
            // return view('pdf.scholarship', compact(['application']));
            $pdf = Pdf::setOption([
                'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
                'isPhpEnabled' => true, 
                'isRemoteEnabled' => true, 
            ])->setPaper('a4', 'potrait')->loadView('pdf.scholarship_institute_confirmation', $data);
            $pdf->save(storage_path('app/public/attachments/'.$fileName.'.pdf'));

            $mailObj->attach(storage_path('app/public/attachments/'.$fileName.'.pdf'));
        }

        return $mailObj;
    }
}
