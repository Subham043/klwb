<?php

namespace App\Modules\IndustryManagement\Staff\Listeners;

use App\Http\Services\SmsService;
use App\Modules\IndustryManagement\Staff\Events\IndustryEmployeeCreated;
use App\Modules\IndustryManagement\Staff\Mails\SendIndustryEmployeeInvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendIndustryEmployeeInviteNotification implements ShouldQueue
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
    public function handle(IndustryEmployeeCreated $event): void
    {
        // Access the order using $event->order...
        // if($event->employee->email){
        //     Mail::to($event->employee->email)->send(new SendIndustryEmployeeInvitationMail($event->employee, $event->password));
        // }

        if($event->employee->phone){
            (new SmsService)->sendOtp($event->employee->phone, $event->employee->otp);
        }
    }
}
