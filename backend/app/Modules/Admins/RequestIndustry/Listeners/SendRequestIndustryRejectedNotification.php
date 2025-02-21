<?php

namespace App\Modules\Admins\RequestIndustry\Listeners;

use App\Modules\Admins\RequestIndustry\Events\RequestIndustryRejected;
use App\Modules\Admins\RequestIndustry\Mails\SendRequestIndustryRejectedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRequestIndustryRejectedNotification implements ShouldQueue
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
    public function handle(RequestIndustryRejected $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendRequestIndustryRejectedMail($event->name, $event->reason));
        }
    }
}
