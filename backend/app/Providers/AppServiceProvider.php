<?php

namespace App\Providers;

use App\Modules\Admins\Authentication\Events\ForgotPassword as AdminsForgotPassword;
use App\Modules\Admins\Authentication\Events\ResendOtp as AdminsResendOtp;
use App\Modules\Admins\Authentication\Events\ResetPasswordResendOtp as AdminsResetPasswordResendOtp;
use App\Modules\Admins\Authentication\Listeners\SendForgotPasswordNotification as AdminsSendForgotPasswordNotification;
use App\Modules\Admins\Authentication\Listeners\SendOtpNotification as AdminsSendOtpNotification;
use App\Modules\Admins\Authentication\Listeners\SendResetPasswordResendOtpNotification as AdminsSendResetPasswordResendOtpNotification;
use App\Modules\Admins\Employees\Events\EmployeeCreated;
use App\Modules\Admins\Employees\Listeners\SendEmployeeInviteNotification;
use App\Modules\Students\Authentication\Events\ForgotPassword as StudentsForgotPassword;
use App\Modules\Students\Authentication\Events\ResendOtp as StudentsResendOtp;
use App\Modules\Students\Authentication\Events\ResetPasswordResendOtp as StudentsResetPasswordResendOtp;
use App\Modules\Students\Authentication\Listeners\SendForgotPasswordNotification as StudentsSendForgotPasswordNotification;
use App\Modules\Students\Authentication\Listeners\SendOtpNotification as StudentsSendOtpNotification;
use App\Modules\Students\Authentication\Listeners\SendResetPasswordResendOtpNotification as StudentsSendResetPasswordResendOtpNotification;
use App\Modules\Students\Authentication\Events\UserRegistered as StudentsUserRegistered;
use App\Modules\Students\Authentication\Listeners\SendRegistrartionNotification as StudentsSendRegistrartionNotification;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Event;
use DateTime;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

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
            AdminsForgotPassword::class,
            AdminsSendForgotPasswordNotification::class,
        );
        Event::listen(
            AdminsResendOtp::class,
            AdminsSendOtpNotification::class,
        );
        Event::listen(
            AdminsResetPasswordResendOtp::class,
            AdminsSendResetPasswordResendOtpNotification::class,
        );
        Event::listen(
            EmployeeCreated::class,
            SendEmployeeInviteNotification::class,
        );
        Event::listen(
            StudentsForgotPassword::class,
            StudentsSendForgotPasswordNotification::class,
        );
        Event::listen(
            StudentsResendOtp::class,
            StudentsSendOtpNotification::class,
        );
        Event::listen(
            StudentsResetPasswordResendOtp::class,
            StudentsSendResetPasswordResendOtpNotification::class,
        );
        Event::listen(
            StudentsUserRegistered::class,
            StudentsSendRegistrartionNotification::class,
        );
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super-Admin') ? true : null;
        });
        Storage::buildTemporaryUrlsUsing(
            function (string $path, DateTime $expiration, array $options) {
                return URL::temporarySignedRoute(
                    'storage.files',
                    $expiration,
                    array_merge($options, ['path' => $path])
                );
            }
        );
    }
}
