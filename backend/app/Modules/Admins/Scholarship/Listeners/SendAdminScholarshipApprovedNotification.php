<?php

namespace App\Modules\Admins\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipApproved;
use App\Modules\Admins\Scholarship\Mails\SendAdminScholarshipApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendAdminScholarshipApprovedNotification implements ShouldQueue
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
    public function handle(AdminScholarshipApproved $event): void
    {
        // Access the order using $event->order...
        // if($event->email){
        //     Mail::to($event->email)->send(new SendAdminScholarshipApprovedMail($event->name));
        // }

        if($event->phone){
            (new SmsService)->sendAdminApprovedSms($event->phone);
        }
    }
}
