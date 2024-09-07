<?php

namespace App\Modules\Students\Scholarship\Enums;

enum ApplicationStatus: int
{
	case Pending = 0;
	case Approve = 1;
	case Reject = 2;
}