<?php

namespace App\Modules\IndustryManagement\Authentication\Services;

use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use App\Modules\IndustryManagement\Industry\Models\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthService
{
    public function login(array $credentials): bool
    {
        return Auth::guard(Guards::Industry->value())->attempt($credentials);
    }

    public function generate_token(IndustryAuth $industryAuth): string
    {
        return $industryAuth->createToken($industryAuth->email)->plainTextToken;
    }

    public function profile(): IndustryAuth
    {
        return Auth::guard(Guards::Industry->value())->user();
    }

    public function logout(Request $request): void
    {
        $request->user()->tokens()->delete();
        auth()->guard(Guards::Industry->value())->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getByPhone(string $phone): IndustryAuth|null
    {
        return IndustryAuth::with('roles')->where('phone', $phone)->where('is_blocked', 0)->firstOrFail();
    }

    public function getByEmail(string $email): IndustryAuth|null
    {
        return IndustryAuth::with('roles')->where('email', $email)->where('is_blocked', 0)->firstOrFail();
    }

    public function getById(string $id): IndustryAuth|null
    {
        return IndustryAuth::with('roles')->where('id', $id)->where('is_blocked', 0)->firstOrFail();
    }

    public function updateIndustryAuth(IndustryAuth $industryAuth, array $data): void
    {
        $industryAuth->update($data);
    }

    public function setPasswordResetLink(array $data): void
    {
        PasswordReset::updateOrCreate(['industry_auth_id' => $data['industry_auth_id']],['uuid'=>$data['uuid'], 'created_at' => now()]);
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
