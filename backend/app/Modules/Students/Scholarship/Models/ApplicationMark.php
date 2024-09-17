<?php

namespace App\Modules\Students\Scholarship\Models;

use App\Modules\CourseManagement\Classes\Models\Classes;
use App\Modules\CourseManagement\Courses\Models\Course;
use App\Modules\CourseManagement\Graduations\Models\Graduation;
use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class ApplicationMark extends Model
{
	use HasFactory;

	protected $table = 'application_marks';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'application_id',
		'graduation_id',
		'course_id',
		'class_id',
		'ins_pin',
		'ins_district_id',
		'ins_taluq_id',
		'prv_class',
		'prv_marks',
		'prv_markcard',
		'prv_markcard2',
	];

	protected $attributes = [];

	protected $casts = [
		'ins_pin' => 'int',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	public $prv_markcard_path = 'student-marks';
	public $prv_markcard2_path = 'student-marks';

	protected $appends = ['prv_markcard_link', 'prv_markcard2_link'];

	protected function prvMarkcard(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->prv_markcard_path . '/' . $value,
		);
	}

	protected function prvMarkcardLink(): Attribute
	{
		return new Attribute(
			get: fn() => ($this->prv_markcard && Storage::exists($this->prv_markcard)) ? Storage::temporaryUrl($this->prv_markcard, now()->addMinutes(20)) : null,
		);
	}

	protected function prvMarkcard2(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->prv_markcard2_path . '/' . $value,
		);
	}

	protected function prvMarkcard2Link(): Attribute
	{
		return new Attribute(
			get: fn() => ($this->prv_markcard2 && Storage::exists($this->prv_markcard2)) ? Storage::temporaryUrl($this->prv_markcard2, now()->addMinutes(20)) : null,
		);
	}

	public function application()
	{
		return $this->belongsTo(Application::class, 'application_id')->withDefault();
	}

	public function graduation()
	{
		return $this->belongsTo(Graduation::class, 'graduation_id')->withDefault();
	}

	public function course()
	{
		return $this->belongsTo(Course::class, 'course_id')->withDefault();
	}

	public function class()
	{
		return $this->belongsTo(Classes::class, 'class_id')->withDefault();
	}

	public function district()
	{
		return $this->belongsTo(City::class, 'ins_district_id')->withDefault();
	}

	public function taluq()
	{
		return $this->belongsTo(Taluq::class, 'ins_taluq_id')->withDefault();
	}
}
