<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Roles\Enums\Roles;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // gets all permissions via Gate::before rule; see AuthServiceProvider
        $admin_role = Role::create(['name' => Roles::SuperAdmin->value(), 'guard_name' => Guards::Admin->value()]);

        // create admin
        Employee::factory()->create([
            'name' => 'Subham Saha',
            'email' => 'subham.backup043@gmail.com',
            'phone' => '7892156160',
            'otp' => rand (1111, 9999),
            'password' => 'subham',
            'verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ])->assignRole($admin_role);

    }
}
