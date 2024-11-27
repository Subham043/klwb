<?php

namespace App\Modules\IndustryManagement\Payment\Enums;

enum PaymentStatus: int
{
	case Pending = 0;
	case Success = 1;
	case Fail = 2;

	public static function getValue(int|null $value): string|null
	{
		return match ($value) {
			self::Pending->value => 'Pending',
			self::Success->value => 'Success',
			self::Fail->value => 'Fail',
			null => null,
			default => null,
		};
	}
}
