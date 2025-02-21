<?php

namespace App\Modules\Admins\RequestIndustry\Listeners;

use App\Modules\Admins\RequestIndustry\Events\RequestIndustryApproved;
use App\Modules\Admins\RequestIndustry\Mails\SendRequestIndustryApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRequestIndustryApprovedNotification implements ShouldQueue
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
    public function handle(RequestIndustryApproved $event): void
    {
        // Access the order using $event->order...
        if($event->email){
            Mail::to($event->email)->send(new SendRequestIndustryApprovedMail($event->name));
        }

    }
}
