<?php

namespace App\Modules\Admins\Authentication\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Admins\Authentication\Events\ResendOtp;
use App\Modules\Admins\Authentication\Mails\SendOtpMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendOtpNotification implements ShouldQueue
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
    public function handle(ResendOtp $event): void
    {
        // Access the order using $event->order...
        if($event->employee->email){
            Mail::to($event->employee->email)->send(new SendOtpMail($event->employee));
        }

        if($event->employee->phone){
            (new SmsService)->sendOtp($event->employee->phone, $event->employee->otp);
        }
    }
}
