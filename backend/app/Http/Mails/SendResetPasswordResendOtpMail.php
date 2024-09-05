<?php

namespace App\Http\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetPasswordResendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee|User|InstituteAuth|IndustryAuth $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee|User|InstituteAuth|IndustryAuth $data)
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
        return $this->subject(config('app.name').' - OTP')->view('emails.reset_password_resend_otp')->with([
            'data' => $this->data
        ]);
    }
}
