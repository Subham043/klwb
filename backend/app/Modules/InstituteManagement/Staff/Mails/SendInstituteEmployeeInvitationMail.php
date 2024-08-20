<?php

namespace App\Modules\InstituteManagement\Staff\Mails;

use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendInstituteEmployeeInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    private InstituteAuth $data;
    private string $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(InstituteAuth $data, string $password)
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
