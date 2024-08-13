<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Enums;

enum Act:int {
    case Labour = 1;
    case Company = 2;
    case Other = 3;

    public static function getValue(string|null $value): string|null
    {
        return match ($value) {
            self::Labour->value => self::Labour->value,
            self::Company->value => self::Company->value,
            self::Other->value => self::Other->value,
            null => null,
            default => null,
        };
    }
}
