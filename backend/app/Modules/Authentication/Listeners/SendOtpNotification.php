<?php

namespace App\Modules\Authentication\Listeners;

use App\Modules\Authentication\Events\ResendOtp;
use App\Modules\Authentication\Mails\SendOtpMail;
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
        Mail::to($event->user->email)->send(new SendOtpMail($event->user));
    }
}