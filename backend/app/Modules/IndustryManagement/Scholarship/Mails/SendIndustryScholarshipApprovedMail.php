<?php

namespace App\Modules\IndustryManagement\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendIndustryScholarshipApprovedMail extends Mailable
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
        return $this->subject(config('app.name').' - Scholarship application Approved from Industry')->view('emails.scholarship_approved')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to Labour Welfare Board for verification, we will notify the status via sms',
        ]);
    }
}
