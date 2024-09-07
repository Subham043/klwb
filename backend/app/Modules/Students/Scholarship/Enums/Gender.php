<?php

namespace App\Modules\Students\Scholarship\Enums;

enum Gender: string
{
	case Male = 'male';
	case Female = 'female';
	case Other = 'others';
}