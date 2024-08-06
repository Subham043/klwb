<?php

namespace Database\Seeders;


use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // gets all permissions via Gate::before rule; see AuthServiceProvider
        Role::create(['name' => 'Admin', 'guard_name' => 'admin']);
        Role::create(['name' => 'Verification-Officer', 'guard_name' => 'admin']);
        Role::create(['name' => 'Financial-Officer', 'guard_name' => 'admin']);
        Role::create(['name' => 'Payment-Officer', 'guard_name' => 'admin']);
        Role::create(['name' => 'Industry', 'guard_name' => 'industry']);
        Role::create(['name' => 'Industry-Staff', 'guard_name' => 'industry']);
        Role::create(['name' => 'Institute', 'guard_name' => 'institute']);
        Role::create(['name' => 'Institute-Staff', 'guard_name' => 'institute']);
        Role::create(['name' => 'Student', 'guard_name' => 'web']);

    }
}
