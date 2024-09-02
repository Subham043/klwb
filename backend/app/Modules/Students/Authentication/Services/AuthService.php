<?php

namespace App\Modules\Students\Authentication\Services;

use App\Http\Abstracts\AbstractAuthService;
use App\Modules\Students\Users\Models\PasswordReset;
use App\Modules\Students\Users\Models\User;
use Illuminate\Database\Eloquent\Builder;

class AuthService extends AbstractAuthService
{

    public function model(): Builder
    {
        return User::with('roles')->where('is_blocked', 0);
    }

    public function setPasswordResetLink(array $data): void
    {
        PasswordReset::updateOrCreate(['user_id' => $data['user_id']],['uuid'=>$data['uuid'], 'created_at' => now()]);
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
