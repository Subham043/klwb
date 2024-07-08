<?php

namespace App\Modules\Employees\Mails;

use App\Modules\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmployeeInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    private User $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $data)
    {
        $this->data = $data;
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
        ]);
    }
}