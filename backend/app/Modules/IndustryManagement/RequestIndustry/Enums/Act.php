<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Enums;

enum Act:int {
    case Labour = 1;
    case Company = 2;
    case Other = 3;

    public static function getValue(int|null $value): string|null
    {
        return match ($value) {
            self::Labour->value => 'Labour',
            self::Company->value => 'Company',
            self::Other->value => 'Other',
            default => null,
        };
    }
}
