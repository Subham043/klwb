<?php

namespace App\Http\Abstracts;

use App\Http\Interfaces\AuthServiceInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

abstract class AbstractAuthService implements AuthServiceInterface
{
	abstract public function model(): Builder;
	abstract public function setPasswordResetLink(array $data): void;
	abstract public function deletePasswordResetLink(string $uuid): void;
	abstract public function getPasswordResetLink(string $uuid): Model|null;

	public function login(array $credentials, string $guard): bool
	{
		return Auth::guard($guard)->attempt($credentials);
	}

	public function generate_token($user): string
	{
		return $user->createToken($user->email ?? ((string) $user->id))->plainTextToken;
	}

	public function profile(string $guard): User
	{
		return Auth::guard($guard)->user();
	}

	public function logout(Request $request, string $guard): void
	{
		$request->user()->tokens()->delete();
		auth()->guard($guard)->logout();
		$request->session()->invalidate();
		$request->session()->regenerateToken();
	}

	public function getById(Int $id): User
	{
		return $this->model()->findOrFail($id);
	}

	public function getByEmail(String $email): User
	{
		return $this->model()->where('email', $email)->firstOrFail();
	}

	public function getByPhone(String $phone): User
	{
		return $this->model()->where('phone', $phone)->firstOrFail();
	}

	public function update($user, array $data): void
	{
		$user->update($data);
	}
}
