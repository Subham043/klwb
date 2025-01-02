<?php

namespace App\Modules\InstituteManagement\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendInstituteScholarshipApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    private string|null $name;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string|null $name)
    {
        $this->name = $name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Scholarship application Approved from Institute')->view('emails.scholarship_approved')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to Industry for verification, we will notify the status via sms',
        ]);
    }
}
