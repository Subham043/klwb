<?php

namespace App\Modules\Admins\Students\Mails;

use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendStudentInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    private User $data;
    private string $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $data, string $password)
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
        return $this->subject(config('app.name').' - Student Invitation')->view('emails.student_invitaion')->with([
            'data' => $this->data,
            'password' => $this->password,
            'link' => $this->data->getLoginClientLink(),
        ]);
    }
}
