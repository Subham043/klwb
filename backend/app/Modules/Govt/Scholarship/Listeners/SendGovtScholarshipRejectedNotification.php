<?php

namespace App\Modules\Govt\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Govt\Scholarship\Events\GovtScholarshipRejected;
use App\Modules\Govt\Scholarship\Mails\SendGovtScholarshipRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendGovtScholarshipRejectedNotification implements ShouldQueue
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
    public function handle(GovtScholarshipRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendGovtScholarshipRejectedMail($event->name, $event->reason));
        }

        if($event->phone){
            (new SmsService)->sendGovtRejectedSms($event->phone, $event->name, $event->reason);
        }
    }
}
