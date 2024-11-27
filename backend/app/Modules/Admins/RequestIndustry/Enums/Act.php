<?php

namespace App\Modules\Admins\RequestIndustry\Enums;

enum Act:int {
    case Labour = 1;
    case Company = 2;
    case Other = 3;

    public static function getValue(int|null $value): string|null
    {
        return match ($value) {
            self::Labour->value => 'Shops and Commercial Act',
            self::Company->value => 'Factory Act',
            self::Other->value => 'Other',
            default => null,
        };
    }
}
