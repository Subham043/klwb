<?php

namespace App\Modules\IndustryManagement\Payment\Events;

use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class IndustryPaymentCompleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Payment $payment,
    ) {
    }
}
