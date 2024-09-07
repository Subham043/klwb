<?php

namespace App\Modules\Students\Scholarship\Enums;

enum Category: string
{
	case General = 'general';
	case OBC = 'obc';
	case SC = 'sc';
	case ST = 'st';
}