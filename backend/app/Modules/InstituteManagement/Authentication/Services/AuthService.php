<?php

namespace App\Modules\InstituteManagement\Authentication\Services;

use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\InstituteManagement\Institutes\Models\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthService
{
    public function login(array $credentials): bool
    {
        return Auth::guard(Guards::Institute->value())->attempt($credentials);
    }

    public function generate_token(InstituteAuth $instituteAuth): string
    {
        return $instituteAuth->createToken($instituteAuth->email)->plainTextToken;
    }

    public function profile(): InstituteAuth
    {
        return Auth::guard(Guards::Institute->value())->user();
    }

    public function logout(Request $request): void
    {
        $request->user()->tokens()->delete();
        auth()->guard(Guards::Institute->value())->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getByPhone(string $phone): InstituteAuth|null
    {
        return InstituteAuth::with('roles')->where('phone', $phone)->where('is_blocked', 0)->firstOrFail();
    }

    public function getByEmail(string $email): InstituteAuth|null
    {
        return InstituteAuth::with('roles')->where('email', $email)->where('is_blocked', 0)->firstOrFail();
    }

    public function getById(string $id): InstituteAuth|null
    {
        return InstituteAuth::with('roles')->where('id', $id)->where('is_blocked', 0)->firstOrFail();
    }

    public function updateInstituteAuth(InstituteAuth $instituteAuth, array $data): void
    {
        $instituteAuth->update($data);
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
