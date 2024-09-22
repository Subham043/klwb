<?php

namespace App\Modules\Auth\Student\Authentication\Services;

use App\Http\Abstracts\AbstractAuthService;
use App\Http\Events\UserRegistered;
use App\Modules\Students\Users\Models\PasswordReset;
use App\Modules\Students\Users\Models\User;
use App\Modules\Students\Users\Services\UserService;
use Illuminate\Database\Eloquent\Builder;

class AuthService extends AbstractAuthService
{

    public function model(): Builder
    {
        return User::with('roles')->where('is_blocked', 0);
    }

    public function register(array $data): User
    {
        $user = (new UserService)->create($data);
        $user->syncRoles(["Student"]);
        UserRegistered::dispatch($user);
        $user->refresh();
        return $user;
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
