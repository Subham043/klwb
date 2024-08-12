<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Enums;

enum UrbanRural:string {
    case URBAN = 'Urban';
    case RURAL = 'Rural';

    public static function getValue(string|null $value): string|null
    {
        return match ($value) {
            self::URBAN->value => self::URBAN->value,
            self::RURAL->value => self::RURAL->value,
            null => null,
            default => null,
        };
    }
}
