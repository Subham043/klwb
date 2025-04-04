<?php

namespace App\Modules\IndustryManagement\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendIndustryScholarshipRejectedMail extends Mailable
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
        return $this->subject(config('app.name').' - Scholarship application Rejected from Industry')->view('emails.scholarship_rejected')->with([
            'name' => $this->name,
            'msg' => 'Your Karnataka Labour Welfare Board Scholarship has been rejected from Industry due to '.$this->reason.', More information login to your account and check the Scholarship status',
        ]);
    }
}
