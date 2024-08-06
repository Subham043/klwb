<?php

namespace App\Modules\Admins\Employees\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmployeeInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee $data;
    private string $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee $data, string $password)
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
        return $this->subject(config('app.name').' - Employee Invitation')->view('emails.employee_invitaion')->with([
            'data' => $this->data,
            'password' => $this->password,
            'link' => $this->data->getLoginClientLink(),
        ]);
    }
}
