<?php

namespace App\Providers;

use App\Modules\Authentication\Events\ForgotPassword;
use App\Modules\Authentication\Events\ResendOtp;
use App\Modules\Authentication\Events\UserRegistered;
use App\Modules\Authentication\Listeners\SendForgotPasswordNotification;
use App\Modules\Authentication\Listeners\SendOtpNotification;
use App\Modules\Authentication\Listeners\SendRegistrartionNotification;
use App\Modules\Employees\Events\EmployeeCreated;
use App\Modules\Employees\Listeners\SendEmployeeInviteNotification;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(
            ForgotPassword::class,
            SendForgotPasswordNotification::class,
        );
        Event::listen(
            ResendOtp::class,
            SendOtpNotification::class,
        );
        Event::listen(
            UserRegistered::class,
            SendRegistrartionNotification::class,
        );
        Event::listen(
            EmployeeCreated::class,
            SendEmployeeInviteNotification::class,
        );
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super-Admin') ? true : null;
        });
    }
}