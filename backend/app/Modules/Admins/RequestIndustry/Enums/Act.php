<?php

namespace App\Modules\Admins\RequestIndustry\Enums;

enum Act:int {
    case Shop = 1;
    case Factory = 2;
    case Society = 3;
    case Labour = 4;

    public static function getValue(int|null $value): string|null
    {
        return match ($value) {
            self::Shop->value => 'Shops and Commercial Act',
            self::Factory->value => 'Factory Act',
            self::Society->value => 'Society Registration Act',
            self::Labour->value => 'Contract Labour Act',
            default => null,
        };
    }
}
