<?php

namespace App\Modules\Finance\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipApproved;
use App\Modules\Finance\Scholarship\Mails\SendFinanceScholarshipApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendFinanceScholarshipApprovedNotification implements ShouldQueue
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
    public function handle(FinanceScholarshipApproved $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendFinanceScholarshipApprovedMail($event->name));
        }

        if($event->phone){
            (new SmsService)->sendFinanceApprovedSms($event->phone);
        }
    }
}
