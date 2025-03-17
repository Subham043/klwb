<?php

namespace App\Modules\Admins\Students\Listeners;

use App\Http\Services\SmsService;
use App\Modules\Admins\Students\Events\StudentCreated;
use App\Modules\Admins\Students\Mails\SendStudentInvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendStudentInviteNotification implements ShouldQueue
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
    public function handle(StudentCreated $event): void
    {
        // Access the order using $event->order...
        // if($event->student->email){
        //     Mail::to($event->student->email)->send(new SendStudentInvitationMail($event->student, $event->password));
        // }

        if($event->student->phone){
            (new SmsService)->sendOtp($event->student->phone, $event->student->otp);
        }
    }
}
