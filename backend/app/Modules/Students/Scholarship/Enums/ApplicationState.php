<?php

namespace App\Modules\Students\Scholarship\Enums;

enum ApplicationState: int
{
	case None = 0;
	case School = 1;
	case Company = 2;
	case Govt = 3;
	case Admin = 4;
}