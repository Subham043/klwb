<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Modules\Users\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // gets all permissions via Gate::before rule; see AuthServiceProvider
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Verification-Officer']);
        Role::create(['name' => 'Financial-Officer']);
        Role::create(['name' => 'Payment-Officer']);
        Role::create(['name' => 'Industry']);
        Role::create(['name' => 'Institute']);
        Role::create(['name' => 'Student']);

    }
}
