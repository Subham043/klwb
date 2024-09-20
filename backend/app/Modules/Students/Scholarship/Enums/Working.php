<?php

namespace App\Modules\Students\Scholarship\Enums;

enum Working: int
{
	case Father = 1;
	case Mother = 2;
	case Parent = 3;

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Father->value => 'Father',
			self::Mother->value => 'Mother',
			self::Parent->value => 'Parent',
			null => null,
			default => null,
		};
	}
}
