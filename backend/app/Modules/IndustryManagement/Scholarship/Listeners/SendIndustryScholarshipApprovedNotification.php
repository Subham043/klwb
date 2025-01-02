<?php

namespace App\Modules\IndustryManagement\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipApproved;
use App\Modules\IndustryManagement\Scholarship\Mails\SendIndustryScholarshipApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendIndustryScholarshipApprovedNotification implements ShouldQueue
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
    public function handle(IndustryScholarshipApproved $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendIndustryScholarshipApprovedMail($event->name));
        }

        // if($event->phone){
        //     (new SmsService)->sendIndustryApprovedSms($event->phone);
        // }
    }
}
