<?php

namespace App\Modules\IndustryManagement\Payment\Listeners;

use App\Modules\IndustryManagement\Payment\Events\IndustryPaymentCompleted;
use App\Modules\IndustryManagement\Payment\Mails\SendAdminPaymentCompletedMail;
use App\Modules\IndustryManagement\Payment\Mails\SendIndustryPaymentCompletedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendIndustryPaymentCompletedNotification implements ShouldQueue
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
    public function handle(IndustryPaymentCompleted $event): void
    {
        // Access the order using $event->order...
        if($event->payment->industry->auth && $event->payment->industry->auth->email){
            Mail::to($event->payment->industry->auth->email)->send(new SendIndustryPaymentCompletedMail($event->payment));
        }
        Mail::to('noreply-klwb@karnataka.gov.in')->send(new SendAdminPaymentCompletedMail($event->payment));

    }
}
