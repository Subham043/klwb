<?php

namespace App\Http\Listeners;

use App\Http\Services\SmsService;
use App\Http\Events\ForgotPassword;
use App\Http\Mails\SendResetPasswordMail;
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
        // if($event->user->email){
        //     Mail::to($event->user->email)->send(new SendResetPasswordMail($event->user, $event->param));
        // }

        if($event->user->phone){
            (new SmsService)->sendOtp($event->user->phone, $event->user->otp);
        }
    }
}
