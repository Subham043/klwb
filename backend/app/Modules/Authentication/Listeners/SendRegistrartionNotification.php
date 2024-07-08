<?php

namespace App\Modules\Authentication\Listeners;

use App\Modules\Authentication\Events\UserRegistered;
use App\Modules\Authentication\Mails\SendRegisteredMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRegistrartionNotification implements ShouldQueue
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
    public function handle(UserRegistered $event): void
    {
        // Access the order using $event->order...
        Mail::to($event->user->email)->send(new SendRegisteredMail($event->user));
    }
}