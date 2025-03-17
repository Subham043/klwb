<?php

namespace App\Modules\InstituteManagement\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\InstituteManagement\Scholarship\Events\InstituteScholarshipApproved;
use App\Modules\InstituteManagement\Scholarship\Mails\SendInstituteScholarshipApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendInstituteScholarshipApprovedNotification implements ShouldQueue
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
    public function handle(InstituteScholarshipApproved $event): void
    {
        // Access the order using $event->order...
        // if($event->email){
        //     Mail::to($event->email)->send(new SendInstituteScholarshipApprovedMail($event->name, $event->application));
        // }

        // if($event->phone){
        //     (new SmsService)->sendInstituteApprovedSms($event->phone);
        // }
    }
}
