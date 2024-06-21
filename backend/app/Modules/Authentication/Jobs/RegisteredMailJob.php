<?php

namespace App\Modules\Authentication\Jobs;

use App\Modules\Authentication\Mails\SendRegisteredMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Modules\Users\Models\User;
use Illuminate\Support\Facades\Mail;

class RegisteredMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected User $data;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->data->email)->send(new SendRegisteredMail($this->data));
    }
}