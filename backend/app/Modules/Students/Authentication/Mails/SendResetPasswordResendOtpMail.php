<?php

namespace App\Modules\Students\Authentication\Mails;

use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetPasswordResendOtpMail extends Mailable
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
        return $this->subject(config('app.name').' - OTP')->view('emails.reset_password_resend_otp')->with([
            'data' => $this->data
        ]);
    }
}
