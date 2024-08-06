<?php

namespace App\Modules\Students\Authentication\Mails;

use App\Modules\Students\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRegisteredMail extends Mailable
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
        return $this->subject(config('app.name').' - Registration Successful')->view('emails.registered')->with([
            'data' => $this->data,
        ]);
    }
}
