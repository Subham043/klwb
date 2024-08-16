<?php

namespace App\Modules\ApplicationManagement\Applications\Models;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\ApplicationManagement\ApplicationDates\Models\ApplicationDate;
use App\Modules\IndustryManagement\RegisteredIndustry\Models\RegisteredIndustry;
use App\Modules\InstituteManagement\RegisteredInstitutes\Models\RegisteredInstitute;
use App\Modules\Students\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
	use HasFactory;

	protected $table = 'applications';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'application_year',
		'student_id',
		'school_id',
		'company_id',
		'uniq',
		'status',
		'application_state',
		'reject_reason',
		'date',
		'pay_status',
		'payf_reason',
		'school_approve',
		'company_approve',
		'govt_approve',
		'admin_approve',
		'application_aadhar_status',
		'govt_note',
		'admin_note',
		'mode_industry',
		'reference_industry',
		'dd_industry',
		'amount_industry',
		'date_offline_industry',
		'mode_govt',
		'reference_govt',
		'dd_govt',
		'amount_govt',
		'date_offline_govt',
		'institute_reject_comment',
		'industry_reject_comment',
		'govt_approve_by',
		'resubmitted_status',
		'hold',
		'deleted',
		'delete_reason',
		'inactive',
		'application_date_id',
	];

	protected $attributes = [];

	protected $casts = [
		'date' => 'datetime',
		'school_approve' => 'datetime',
		'company_approve' => 'datetime',
		'govt_approve' => 'datetime',
		'admin_approve' => 'datetime',
		'date_offline_industry' => 'datetime',
		'date_offline_govt' => 'datetime',
		'application_year' => 'int',
		'mode_industry' => 'boolean',
		'mode_govt' => 'boolean',
		'application_aadhar_status' => 'boolean',
		'resubmitted_status' => 'boolean',
		'hold' => 'boolean',
		'deleted' => 'boolean',
		'inactive' => 'boolean',
		'pay_status' => 'boolean',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	public function student()
	{
		return $this->belongsTo(User::class, 'student_id')->withDefault();
	}
	
	public function institute()
	{
		return $this->belongsTo(RegisteredInstitute::class, 'school_id')->withDefault();
	}
	
	public function industry()
	{
		return $this->belongsTo(RegisteredIndustry::class, 'company_id')->withDefault();
	}

	public function approved_by()
	{
		return $this->belongsTo(Employee::class, 'govt_approve_by')->withDefault();
	}

	public function application_date()
	{
		return $this->belongsTo(ApplicationDate::class, 'application_date_id')->withDefault();
	}

	public function basic_detail()
	{
		return $this->hasOne(ApplicationBasicDetail::class, 'application_id')->withDefault();
	}

	public function mark()
	{
		return $this->hasOne(ApplicationMark::class, 'application_id')->withDefault();
	}

	public function company()
	{
		return $this->hasOne(ApplicationCompany::class, 'application_id')->withDefault();
	}
	
	public function account()
	{
		return $this->hasOne(ApplicationAccount::class, 'application_id')->withDefault();
	}

}
