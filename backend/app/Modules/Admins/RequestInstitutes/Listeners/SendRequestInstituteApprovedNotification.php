<?php

namespace App\Modules\Admins\RequestInstitutes\Listeners;

use App\Modules\Admins\RequestInstitutes\Events\RequestInstituteApproved;
use App\Modules\Admins\RequestInstitutes\Mails\SendRequestInstituteApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRequestInstituteApprovedNotification implements ShouldQueue
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
    public function handle(RequestInstituteApproved $event): void
    {
        // Access the order using $event->order...
        // if($event->email){
        //     Mail::to($event->email)->send(new SendRequestInstituteApprovedMail($event->name));
        // }

    }
}
