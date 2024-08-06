<?php

namespace App\Modules\Students\Authentication\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Students\Authentication\Events\ResetPasswordResendOtp;
use App\Modules\Students\Authentication\Mails\SendResetPasswordResendOtpMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendResetPasswordResendOtpNotification implements ShouldQueue
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
    public function handle(ResetPasswordResendOtp $event): void
    {
        // Access the order using $event->order...
        if($event->user->email){
            Mail::to($event->user->email)->send(new SendResetPasswordResendOtpMail($event->user));
        }

        if($event->user->phone){
            (new SmsService)->sendOtp($event->user->phone, $event->user->otp);
        }
    }
}
