<?php

namespace App\Modules\Finance\Scholarship\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipRejected;
use App\Modules\Finance\Scholarship\Mails\SendFinanceScholarshipRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendFinanceScholarshipRejectedNotification implements ShouldQueue
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
    public function handle(FinanceScholarshipRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendFinanceScholarshipRejectedMail($event->name, $event->reason));
        }

        if($event->phone){
            (new SmsService)->sendFinanceRejectedSms($event->phone, $event->reason);
        }
    }
}
