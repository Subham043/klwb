<?php

namespace App\Modules\Authentication\Mails;

use App\Modules\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    private User $data;
    private string $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $data, string $token)
    {
        $this->data = $data;
        $this->token = $token;
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
            'link' => config('app.client_url').'/auth/reset-password/'.$this->token.'?type='.str()->lower($this->data->currentRole)
        ]);
    }
}