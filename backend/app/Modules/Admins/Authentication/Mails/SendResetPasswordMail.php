<?php

namespace App\Modules\Admins\Authentication\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee $data;
    private string $param;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee $data, string $param)
    {
        $this->data = $data;
        $this->param = $param;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Reset Password')->view('emails.reset_password')->with([
            'data' => $this->data,
            'link' => $this->data->getResetPasswordClientLink().$this->param
        ]);
    }
}
