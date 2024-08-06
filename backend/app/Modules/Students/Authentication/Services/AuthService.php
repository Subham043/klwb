<?php

namespace App\Modules\Students\Authentication\Services;

use App\Http\Enums\Guards;
use App\Modules\Students\Users\Models\PasswordReset;
use Illuminate\Support\Facades\Auth;
use App\Modules\Students\Users\Models\User;
use Illuminate\Http\Request;

class AuthService
{
    public function login(array $credentials): bool
    {
        return Auth::attempt($credentials);
    }

    public function generate_token(User $user): string
    {
        return $user->createToken($user->email)->plainTextToken;
    }

    public function profile(): User
    {
        return Auth::user();
    }

    public function logout(Request $request): void
    {
        $request->user()->tokens()->delete();
        auth()->guard(Guards::Web->value())->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getByPhone(string $phone): User|null
    {
        return User::with('roles')->where('phone', $phone)->where('is_blocked', 0)->firstOrFail();
    }

    public function getByEmail(string $email): User|null
    {
        return User::with('roles')->where('email', $email)->where('is_blocked', 0)->firstOrFail();
    }

    public function getById(string $id): User|null
    {
        return User::with('roles')->where('id', $id)->where('is_blocked', 0)->firstOrFail();
    }

    public function updateUser(User $user, array $data): void
    {
        $user->update($data);
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
