<?php

namespace App\Modules\Admins\RequestInstitutes\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRequestInstituteRejectedMail extends Mailable
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
        return $this->subject(config('app.name').' - Institute Add Request Rejected from Labour Welfare Board')->view('emails.request_institute_rejected')->with([
            'name' => $this->name,
            'msg' => 'Your Institute Add Request has been rejected from Labour Welfare Board due to '.$this->reason.'.',
        ]);
    }
}
