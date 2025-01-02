<?php

namespace App\Modules\Govt\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendGovtScholarshipRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    private string|null $name;
    private string $reason;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string|null $name, string $reason)
    {
        $this->name = $name;
        $this->reason = $reason;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Scholarship application Rejected from Govt Verification Officer')->view('emails.scholarship_rejected')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been rejected from Govt Verification Officer due to '.$this->reason.', More information login to your account and check the Scholarship status',
        ]);
    }
}
