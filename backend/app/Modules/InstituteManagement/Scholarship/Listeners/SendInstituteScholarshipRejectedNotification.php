<?php

namespace App\Modules\InstituteManagement\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\InstituteManagement\Scholarship\Events\InstituteScholarshipRejected;
use App\Modules\InstituteManagement\Scholarship\Mails\SendInstituteScholarshipRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendInstituteScholarshipRejectedNotification implements ShouldQueue
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
    public function handle(InstituteScholarshipRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendInstituteScholarshipRejectedMail($event->name, $event->reason));
        }

        if($event->phone){
            (new SmsService)->sendInstituteRejectedSms($event->phone, $event->name, $event->reason);
        }
    }
}
