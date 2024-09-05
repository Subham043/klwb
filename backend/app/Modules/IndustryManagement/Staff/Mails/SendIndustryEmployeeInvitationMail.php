<?php

namespace App\Modules\IndustryManagement\Staff\Mails;

use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendIndustryEmployeeInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    private IndustryAuth $data;
    private string $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(IndustryAuth $data, string $password)
    {
        $this->data = $data;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Employee Invitation')->view('emails.employee_institute_invitaion')->with([
            'data' => $this->data,
            'password' => $this->password,
            'link' => $this->data->getLoginClientLink(),
        ]);
    }
}
