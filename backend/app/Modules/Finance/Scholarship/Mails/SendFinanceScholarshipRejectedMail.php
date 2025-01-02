<?php

namespace App\Modules\Finance\Scholarship\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendFinanceScholarshipRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    private string|null $name;
    private string $reason;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string|null $name, string $reason)
    {
        $this->name = $name;
        $this->reason = $reason;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Scholarship Payment Status')->view('emails.scholarship_rejected')->with([
            'name' => $this->name,
            'msg' => 'Sorry!, Your Karnataka Labour Welfare Board Scholarship  Amount has been Failed due to '.$this->reason,
        ]);
    }
}
