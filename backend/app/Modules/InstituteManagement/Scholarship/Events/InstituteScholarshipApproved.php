<?php

namespace App\Modules\InstituteManagement\Scholarship\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InstituteScholarshipApproved
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string|null $email,
        public string|null $phone,
        public string|null $name,
    ) {
    }
}
