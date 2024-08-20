<?php

namespace App\Modules\InstituteManagement\Staff\Events;

use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InstituteEmployeeCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public InstituteAuth $employee,
        public string $password
    ) {
    }
}
