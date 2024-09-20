<?php

namespace App\Modules\Students\Scholarship\Models;

use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use App\Modules\Students\Scholarship\Enums\Working;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class ApplicationCompany extends Model
{
	use HasFactory;

	protected $table = 'application_companies';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'application_id',
		'who_working',
		'name',
		'relationship',
		'msalary',
		'pincode',
		'district_id',
		'taluq_id',
		'employeeID',
		'salaryslip',
	];

	protected $attributes = [];

	protected $casts = [
		'msalary' => 'int',
		'pincode' => 'int',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	public $salaryslip_path = 'salaryslip';

	protected $appends = ['salaryslip_link', 'who_working_text'];

	protected function whoWorkingText(): Attribute
	{
		return new Attribute(
			get: fn() => Working::getValue($this->who_working),
		);
	}

	protected function salaryslip(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->salaryslip_path . '/' . $value,
		);
	}

	protected function salaryslipLink(): Attribute
	{
		return new Attribute(
			get: fn() => ($this->salaryslip && Storage::exists($this->salaryslip)) ? Storage::temporaryUrl($this->salaryslip, now()->addMinutes(20)) : null,
		);
	}

	public function application()
	{
		return $this->belongsTo(Application::class, 'application_id')->withDefault();
	}

	public function district()
	{
		return $this->belongsTo(City::class, 'district_id')->withDefault();
	}

	public function taluq()
	{
		return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
	}
}
