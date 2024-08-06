<?php

namespace App\Modules\Admins\Authentication\Mails;

use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    private Employee $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Employee $data)
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
