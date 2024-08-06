<?php

namespace App\Modules\Admins\Authentication\Services;

use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Admins\Employees\Models\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthService
{
    public function login(array $credentials): bool
    {
        return Auth::guard(Guards::Admin->value())->attempt($credentials);
    }

    public function generate_token(Employee $employee): string
    {
        return $employee->createToken($employee->email)->plainTextToken;
    }

    public function profile(): Employee
    {
        return Auth::guard(Guards::Admin->value())->user();
    }

    public function logout(Request $request): void
    {
        $request->user()->tokens()->delete();
        auth()->guard(Guards::Admin->value())->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getByPhone(string $phone): Employee|null
    {
        return Employee::with('roles')->where('phone', $phone)->where('is_blocked', 0)->firstOrFail();
    }

    public function getByEmail(string $email): Employee|null
    {
        return Employee::with('roles')->where('email', $email)->where('is_blocked', 0)->firstOrFail();
    }

    public function getById(string $id): Employee|null
    {
        return Employee::with('roles')->where('id', $id)->where('is_blocked', 0)->firstOrFail();
    }

    public function updateEmployee(Employee $employee, array $data): void
    {
        $employee->update($data);
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
