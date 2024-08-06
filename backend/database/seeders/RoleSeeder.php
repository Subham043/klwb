<?php

namespace Database\Seeders;

use App\Http\Enums\Guards;
use App\Modules\Roles\Enums\Roles;
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
        Role::create(['name' => Roles::Admin->value(), 'guard_name' => Guards::Admin->value()]);
        Role::create(['name' => Roles::VerificationOfficer->value(), 'guard_name' => Guards::Admin->value()]);
        Role::create(['name' => Roles::FinancialOfficer->value(), 'guard_name' => Guards::Admin->value()]);
        Role::create(['name' => Roles::PaymentOfficer->value(), 'guard_name' => Guards::Admin->value()]);
        Role::create(['name' => Roles::Industry->value(), 'guard_name' => Guards::Industry->value()]);
        Role::create(['name' => Roles::IndustryStaff->value(), 'guard_name' => Guards::Industry->value()]);
        Role::create(['name' => Roles::Institute->value(), 'guard_name' => Guards::Institute->value()]);
        Role::create(['name' => Roles::InstituteStaff->value(), 'guard_name' => Guards::Institute->value()]);
        Role::create(['name' => Roles::Student->value(), 'guard_name' => Guards::Web->value()]);

    }
}
