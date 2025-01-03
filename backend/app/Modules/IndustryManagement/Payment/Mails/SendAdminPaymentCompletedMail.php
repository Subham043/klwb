<?php

namespace App\Modules\IndustryManagement\Payment\Mails;

use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendAdminPaymentCompletedMail extends Mailable
{
    use Queueable, SerializesModels;

    private Payment $payment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mailObj = $this->subject(config('app.name').' - Indusrtry Contribution Success')->view('emails.payment_completed_admin')->with([
            'payment' => $this->payment,
        ]);

        return $mailObj;
    }
}
