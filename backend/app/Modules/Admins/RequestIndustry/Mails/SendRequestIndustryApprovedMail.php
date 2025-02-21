<?php

namespace App\Modules\Admins\RequestIndustry\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRequestIndustryApprovedMail extends Mailable
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
        return $this->subject(config('app.name').' - Industry Add Request Approved from Labour Welfare Board')->view('emails.request_industry_approved')->with([
            'name' => $this->name,
            'msg' => 'Congratulations!, Your Industry Add Request has been  approved by the Labour Welfare Board.',
        ]);
    }
}
