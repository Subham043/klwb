<?php

namespace App\Modules\Admins\Employees\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Admins\Employees\Events\EmployeeCreated;
use App\Modules\Admins\Employees\Mails\SendEmployeeInvitationMail;
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
        if($event->employee->email){
            Mail::to($event->employee->email)->send(new SendEmployeeInvitationMail($event->employee));
        }

        if($event->employee->phone){
            (new SmsService)->sendOtp($event->employee->phone, $event->employee->otp);
        }
    }
}
