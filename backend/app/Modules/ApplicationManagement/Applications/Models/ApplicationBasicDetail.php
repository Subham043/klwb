<?php

namespace App\Modules\ApplicationManagement\Applications\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class ApplicationBasicDetail extends Model
{
	use HasFactory;

	protected $table = 'application_basic_details';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'application_id',
		'name',
		'father_name',
		'mother_name',
		'address',
		'parent_phone',
		'is_scst',
		'category',
		'cast_certificate',
		'cast_no',
		'adharcard_no',
		'adharcard_file',
		'gender',
		'f_adhar',
		'f_adharfile',
		'm_adhar',
		'm_adharfile',
		'not_applicable',
		'deathcertificate',
	];

	protected $attributes = [];

	protected $casts = [
		'is_scst' => 'boolean',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	public $cast_certificate_path = 'student-cast';
	public $adharcard_file_path = 'student-adhar';
	public $f_adharfile_path = 'father-adhar';
	public $m_adharfile_path = 'mother-adhar';
	public $deathcertificate_path = 'student-death';

	protected $appends = ['cast_certificate_link', 'adharcard_file_link', 'f_adharfile_link', 'm_adharfile_link', 'deathcertificate_link'];

	protected function castCertificate(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->cast_certificate_path . '/' . $value,
		);
	}

	protected function castCertificateLink(): Attribute
	{
		return new Attribute(
			get: fn() => $this->cast_certificate ? Storage::temporaryUrl($this->cast_certificate, now()->addMinutes(5)) : null,
		);
	}
	
	protected function adharcardFile(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->adharcard_file_path . '/' . $value,
		);
	}

	protected function adharcardFileLink(): Attribute
	{
		return new Attribute(
			get: fn() => $this->adharcard_file ? Storage::temporaryUrl($this->adharcard_file, now()->addMinutes(5)) : null,
		);
	}
	
	protected function fAdharfile(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->f_adharfile_path . '/' . $value,
		);
	}

	protected function fAdharfileLink(): Attribute
	{
		return new Attribute(
			get: fn() => $this->f_adharfile ? Storage::temporaryUrl($this->f_adharfile, now()->addMinutes(5)) : null,
		);
	}
	
	protected function mAdharfile(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->m_adharfile_path . '/' . $value,
		);
	}

	protected function mAdharfileLink(): Attribute
	{
		return new Attribute(
			get: fn() => $this->m_adharfile ? Storage::temporaryUrl($this->m_adharfile, now()->addMinutes(5)) : null,
		);
	}
	
	protected function deathcertificate(): Attribute
	{
		return Attribute::make(
			set: fn(string $value) => $this->deathcertificate_path . '/' . $value,
		);
	}

	protected function deathcertificateLink(): Attribute
	{
		return new Attribute(
			get: fn() => $this->deathcertificate ? Storage::temporaryUrl($this->deathcertificate, now()->addMinutes(5)) : null,
		);
	}

	public function application()
	{
		return $this->belongsTo(Application::class, 'application_id')->withDefault();
	}
}
