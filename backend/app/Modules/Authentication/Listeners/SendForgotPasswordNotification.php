<?php

namespace App\Modules\Authentication\Listeners;

use App\Modules\Authentication\Events\ForgotPassword;
use App\Modules\Authentication\Mails\SendResetPasswordMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendForgotPasswordNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public $tries = 3;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        // ...
    }

    /**
     * Handle the event.
     */
    public function handle(ForgotPassword $event): void
    {
        // Access the order using $event->order...
        Mail::to($event->user->email)->send(new SendResetPasswordMail($event->user, $event->token));
    }
}