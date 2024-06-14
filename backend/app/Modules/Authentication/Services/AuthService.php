<?php

namespace App\Modules\Authentication\Services;

use Illuminate\Support\Facades\Auth;
use App\Modules\Users\Models\User;

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

    public function logout(): void
    {
        auth()->user()->currentAccessToken()->delete();
    }

}