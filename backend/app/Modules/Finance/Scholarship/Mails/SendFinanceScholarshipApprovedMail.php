<?php

namespace App\Modules\Finance\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendFinanceScholarshipApprovedMail extends Mailable
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
        return $this->subject(config('app.name').' - Scholarship Payment Status')->view('emails.scholarship_approved')->with([
            'name' => $this->name,
            'msg' => 'Congratulations!, Your Scholarship  Application has been  approved by government .The Scholarship amount will be credited to your account shortly!',
        ]);
    }
}
