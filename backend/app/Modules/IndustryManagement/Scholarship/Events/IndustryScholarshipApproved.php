<?php

namespace App\Modules\IndustryManagement\Scholarship\Events;

use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class IndustryScholarshipApproved
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string|null $email,
        public string|null $phone,
        public string|null $name,
        public Application $application,
        public mixed $industryPayment,
    ) {
    }
}
