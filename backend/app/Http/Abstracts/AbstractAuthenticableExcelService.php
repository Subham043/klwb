<?php

namespace App\Http\Abstracts;

use App\Http\Interfaces\ExcelServiceInterface;
use Spatie\SimpleExcel\SimpleExcelWriter;

abstract class AbstractAuthenticableExcelService extends AbstractAuthenticableService implements ExcelServiceInterface
{
	abstract public function excel(): SimpleExcelWriter;
}
