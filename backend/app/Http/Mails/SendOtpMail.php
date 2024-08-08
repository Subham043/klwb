<?php

namespace App\Http\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee|User|InstituteAuth $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee|User|InstituteAuth $data)
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
        return $this->subject(config('app.name').' - OTP')->view('emails.otp')->with([
            'data' => $this->data
        ]);
    }
}
