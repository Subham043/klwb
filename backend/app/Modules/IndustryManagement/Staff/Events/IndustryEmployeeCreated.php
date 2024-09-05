<?php

namespace App\Modules\IndustryManagement\Staff\Events;

use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class IndustryEmployeeCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public IndustryAuth $employee,
        public string $password
    ) {
    }
}
