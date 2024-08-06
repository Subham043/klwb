<?php

namespace App\Modules\Roles\Enums;

enum Roles:string {
    case SuperAdmin = 'Super-Admin';
    case Admin = 'Admin';
    case VerificationOfficer = 'Verification-Officer';
    case FinancialOfficer = 'Financial-Officer';
    case PaymentOfficer = 'Payment-Officer';
    case Industry = 'Industry';
    case IndustryStaff = 'Industry-Staff';
    case Institute = 'Institute';
    case InstituteStaff = 'Institute-Staff';
    case Student = 'Student';

    public function value(): string
    {
        return $this->value;
    }

    public function getEmployeeRoles(): array
    {
        return [
            self::Admin,
            self::VerificationOfficer,
            self::FinancialOfficer,
            self::PaymentOfficer,
        ];
    }

    public function getIndustryRoles(): array
    {
        return [
            self::Industry,
            self::IndustryStaff,
        ];
    }

    public function getInstituteRoles(): array
    {
        return [
            self::Institute,
            self::InstituteStaff,
        ];
    }
}
