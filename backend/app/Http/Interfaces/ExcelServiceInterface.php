<?php
namespace App\Http\Interfaces;

use Spatie\SimpleExcel\SimpleExcelWriter;

interface ExcelServiceInterface extends ServiceInterface
{
	public function excel(): SimpleExcelWriter;
}