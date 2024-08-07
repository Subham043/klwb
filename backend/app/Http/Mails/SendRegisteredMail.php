<?php

namespace App\Http\Mails;

use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    private User|InstituteAuth $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User|InstituteAuth $data)
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
        return $this->subject(config('app.name').' - Registration Successful')->view('emails.registered')->with([
            'data' => $this->data,
            'link' => $this->data->getLoginClientLink()
        ]);
    }
}
