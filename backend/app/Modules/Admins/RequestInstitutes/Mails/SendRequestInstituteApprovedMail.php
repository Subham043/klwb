<?php

namespace App\Modules\Admins\RequestInstitutes\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRequestInstituteApprovedMail extends Mailable
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
        return $this->subject(config('app.name').' - Institute Add Request Approved from Labour Welfare Board')->view('emails.request_institute_approved')->with([
            'name' => $this->name,
            'msg' => 'Congratulations!, Your Institute Add Request has been  approved by the Labour Welfare Board.',
        ]);
    }
}
