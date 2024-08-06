<?php

namespace App\Http\Events;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Students\Users\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ResendOtp
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Employee|User $user
    ) {}
}
