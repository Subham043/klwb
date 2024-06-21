<?php

namespace App\Modules\Authentication\Jobs;

use App\Modules\Authentication\Mails\SendOtpMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Modules\Users\Models\User;
use Illuminate\Support\Facades\Mail;

class OtpMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected User $data;
    protected string $token;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $data, string $token)
    {
        $this->data = $data;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->data->email)->send(new SendOtpMail($this->data));
    }
}