<?php

namespace App\Modules\Students\Scholarship\Enums;

enum AccountType: int
{
	case Parent = 1;
	case Student = 2;

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Parent->value => 'Parent',
			self::Student->value => 'Student',
			null => null,
			default => null,
		};
	}
}