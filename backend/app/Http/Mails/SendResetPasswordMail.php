<?php

namespace App\Http\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee|User|InstituteAuth $data;
    private string $param;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee|User|InstituteAuth $data, string $param)
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
