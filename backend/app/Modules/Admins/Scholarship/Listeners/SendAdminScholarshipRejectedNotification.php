<?php

namespace App\Modules\Admins\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipRejected;
use App\Modules\Admins\Scholarship\Mails\SendAdminScholarshipRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendAdminScholarshipRejectedNotification implements ShouldQueue
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
    public function handle(AdminScholarshipRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendAdminScholarshipRejectedMail($event->name, $event->reason));
        }

        if($event->phone){
            (new SmsService)->sendAdminRejectedSms($event->phone, $event->name, $event->reason);
        }
    }
}
