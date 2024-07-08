<?php

namespace App\Modules\Employees\Listeners;

use App\Modules\Employees\Events\EmployeeCreated;
use App\Modules\Employees\Mails\SendEmployeeInvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendEmployeeInviteNotification implements ShouldQueue
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
    public function handle(EmployeeCreated $event): void
    {
        // Access the order using $event->order...
        Mail::to($event->user->email)->send(new SendEmployeeInvitationMail($event->user));
    }
}