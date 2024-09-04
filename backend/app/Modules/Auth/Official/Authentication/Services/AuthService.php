<?php

namespace App\Modules\Auth\Official\Authentication\Services;

use App\Http\Abstracts\AbstractAuthService;
use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Admins\Employees\Models\PasswordReset;
use Illuminate\Database\Eloquent\Builder;

class AuthService extends AbstractAuthService
{

    public function model(): Builder
    {
        return Employee::with('roles')->where('is_blocked', 0);
    }

    public function setPasswordResetLink(array $data): void
    {
        PasswordReset::updateOrCreate(['employee_id' => $data['employee_id']],['uuid'=>$data['uuid'], 'created_at' => now()]);
    }

    public function deletePasswordResetLink(string $uuid): void
    {
        PasswordReset::where('uuid', $uuid)->delete();
    }

    public function getPasswordResetLink(string $uuid): PasswordReset|null
    {
        return PasswordReset::with('employee')->where('uuid', $uuid)->whereHas('employee')->first();
    }

}
