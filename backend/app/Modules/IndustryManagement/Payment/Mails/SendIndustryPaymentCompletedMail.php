<?php

namespace App\Modules\IndustryManagement\Payment\Mails;

use App\Http\Services\NumberToWordService;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class SendIndustryPaymentCompletedMail extends Mailable
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
        $mailObj = $this->subject(config('app.name').' - Indusrtry Contribution Success')->view('emails.payment_completed')->with([
            'payment' => $this->payment,
        ]);

        $fileName = str()->uuid();
        $data = [
            'payment' => $this->payment,
            'price_word' => (new NumberToWordService)->convert($this->payment->price)
        ];
        $pdf = Pdf::setOption([
            'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
            'isPhpEnabled' => true, 
            'isRemoteEnabled' => true, 
        ])->setPaper('a4', 'potrait')->loadView('pdf.industry_reciept', $data);
        $pdf->save(storage_path('app\\public\\attachments\\'.$fileName.'.pdf'));

        $mailObj->attach(storage_path('app\\public\\attachments\\'.$fileName.'.pdf'));

        return $mailObj;
    }
}
