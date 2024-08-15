<?php

namespace App\Modules\ApplicationManagement\Applications\Enums;

enum Gender: string
{
	case Male = 'male';
	case Female = 'female';
	case Other = 'others';
}