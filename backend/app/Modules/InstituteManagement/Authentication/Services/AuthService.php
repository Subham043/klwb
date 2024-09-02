<?php

namespace App\Modules\InstituteManagement\Authentication\Services;

use App\Http\Abstracts\AbstractAuthService;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\InstituteManagement\Institutes\Models\PasswordReset;
use Illuminate\Database\Eloquent\Builder;

class AuthService extends AbstractAuthService
{

    public function model(): Builder
    {
        return InstituteAuth::with('roles')->where('is_blocked', 0);
    }

    public function setPasswordResetLink(array $data): void
    {
        PasswordReset::updateOrCreate(['school_auth_id' => $data['school_auth_id']],['uuid'=>$data['uuid'], 'created_at' => now()]);
    }

    public function deletePasswordResetLink(string $uuid): void
    {
        PasswordReset::where('uuid', $uuid)->delete();
    }

    public function getPasswordResetLink(string $uuid): PasswordReset|null
    {
        return PasswordReset::with('user')->where('uuid', $uuid)->whereHas('user')->first();
    }

}
