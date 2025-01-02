<?php

namespace App\Modules\IndustryManagement\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipRejected;
use App\Modules\IndustryManagement\Scholarship\Mails\SendIndustryScholarshipRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendIndustryScholarshipRejectedNotification implements ShouldQueue
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
    public function handle(IndustryScholarshipRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendIndustryScholarshipRejectedMail($event->name, $event->reason));
        }

        if($event->phone){
            (new SmsService)->sendIndustryRejectedSms($event->phone, $event->name, $event->reason);
        }
    }
}
