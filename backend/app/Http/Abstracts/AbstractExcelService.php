<?php

namespace App\Http\Abstracts;

use App\Http\Interfaces\ExcelServiceInterface;
use Spatie\SimpleExcel\SimpleExcelWriter;

abstract class AbstractExcelService extends AbstractService implements ExcelServiceInterface
{
	abstract public function excel(): SimpleExcelWriter;
}
