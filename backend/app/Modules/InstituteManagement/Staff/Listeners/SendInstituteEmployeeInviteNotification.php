<?php

namespace App\Modules\InstituteManagement\Staff\Listeners;

use App\Http\Services\SmsService;
use App\Modules\InstituteManagement\Staff\Events\InstituteEmployeeCreated;
use App\Modules\InstituteManagement\Staff\Mails\SendInstituteEmployeeInvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendInstituteEmployeeInviteNotification implements ShouldQueue
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
    public function handle(InstituteEmployeeCreated $event): void
    {
        // Access the order using $event->order...
        if($event->employee->email){
            Mail::to($event->employee->email)->send(new SendInstituteEmployeeInvitationMail($event->employee, $event->password));
        }

        if($event->employee->phone){
            (new SmsService)->sendOtp($event->employee->phone, $event->employee->otp);
        }
    }
}
