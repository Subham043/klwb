<?php

namespace App\Providers;

use App\Http\Events\ForgotPassword as AdminsForgotPassword;
use App\Http\Events\ResendOtp as AdminsResendOtp;
use App\Http\Events\ResetPasswordResendOtp as AdminsResetPasswordResendOtp;
use App\Http\Listeners\SendForgotPasswordNotification as AdminsSendForgotPasswordNotification;
use App\Http\Listeners\SendOtpNotification as AdminsSendOtpNotification;
use App\Http\Listeners\SendResetPasswordResendOtpNotification as AdminsSendResetPasswordResendOtpNotification;
use App\Modules\Admins\Employees\Events\EmployeeCreated;
use App\Modules\Admins\Employees\Listeners\SendEmployeeInviteNotification;
use App\Http\Events\ForgotPassword as StudentsForgotPassword;
use App\Http\Events\ResendOtp as StudentsResendOtp;
use App\Http\Events\ResetPasswordResendOtp as StudentsResetPasswordResendOtp;
use App\Http\Listeners\SendForgotPasswordNotification as StudentsSendForgotPasswordNotification;
use App\Http\Listeners\SendOtpNotification as StudentsSendOtpNotification;
use App\Http\Listeners\SendResetPasswordResendOtpNotification as StudentsSendResetPasswordResendOtpNotification;
use App\Http\Events\UserRegistered as StudentsUserRegistered;
use App\Http\Listeners\SendRegistrartionNotification as StudentsSendRegistrartionNotification;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipApproved;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipRejected;
use App\Modules\Admins\Scholarship\Listeners\SendAdminScholarshipApprovedNotification;
use App\Modules\Admins\Scholarship\Listeners\SendAdminScholarshipRejectedNotification;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipApproved;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipRejected;
use App\Modules\Finance\Scholarship\Listeners\SendFinanceScholarshipApprovedNotification;
use App\Modules\Finance\Scholarship\Listeners\SendFinanceScholarshipRejectedNotification;
use App\Modules\Govt\Scholarship\Events\GovtScholarshipRejected;
use App\Modules\Govt\Scholarship\Listeners\SendGovtScholarshipRejectedNotification;
use App\Modules\IndustryManagement\Payment\Events\IndustryPaymentCompleted;
use App\Modules\IndustryManagement\Payment\Listeners\SendIndustryPaymentCompletedNotification;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipApproved;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipRejected;
use App\Modules\IndustryManagement\Scholarship\Listeners\SendIndustryScholarshipApprovedNotification;
use App\Modules\IndustryManagement\Scholarship\Listeners\SendIndustryScholarshipRejectedNotification;
use App\Modules\InstituteManagement\Scholarship\Events\InstituteScholarshipApproved;
use App\Modules\InstituteManagement\Scholarship\Events\InstituteScholarshipRejected;
use App\Modules\InstituteManagement\Scholarship\Listeners\SendInstituteScholarshipApprovedNotification;
use App\Modules\InstituteManagement\Scholarship\Listeners\SendInstituteScholarshipRejectedNotification;
use App\Modules\InstituteManagement\Staff\Events\InstituteEmployeeCreated;
use App\Modules\InstituteManagement\Staff\Listeners\SendInstituteEmployeeInviteNotification;
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
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
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
            InstituteEmployeeCreated::class,
            SendInstituteEmployeeInviteNotification::class,
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
        Event::listen(
            GovtScholarshipRejected::class,
            SendGovtScholarshipRejectedNotification::class,
        );
        Event::listen(
            FinanceScholarshipRejected::class,
            SendFinanceScholarshipRejectedNotification::class,
        );
        Event::listen(
            InstituteScholarshipRejected::class,
            SendInstituteScholarshipRejectedNotification::class,
        );
        Event::listen(
            InstituteScholarshipApproved::class,
            SendInstituteScholarshipApprovedNotification::class,
        );
        Event::listen(
            IndustryScholarshipRejected::class,
            SendIndustryScholarshipRejectedNotification::class,
        );
        Event::listen(
            IndustryScholarshipApproved::class,
            SendIndustryScholarshipApprovedNotification::class,
        );
        Event::listen(
            AdminScholarshipRejected::class,
            SendAdminScholarshipRejectedNotification::class,
        );
        Event::listen(
            AdminScholarshipApproved::class,
            SendAdminScholarshipApprovedNotification::class,
        );
        Event::listen(
            FinanceScholarshipApproved::class,
            SendFinanceScholarshipApprovedNotification::class,
        );
        Event::listen(
            IndustryPaymentCompleted::class,
            SendIndustryPaymentCompletedNotification::class,
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
