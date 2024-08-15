<?php

namespace App\Modules\ApplicationManagement\Applications\Enums;

enum Category: string
{
	case General = 'general';
	case OBC = 'obc';
	case SC = 'sc';
	case ST = 'st';
}