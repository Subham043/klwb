<?php

namespace App\Modules\Students\Scholarship\Models;

use App\Http\Interfaces\ScholarshipApplicationTraitInterface;
use App\Http\Traits\ScholarshipApplicationTrait;
use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Admins\ApplicationDates\Models\ApplicationDate;
use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\Admins\Institutes\Models\Institute;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\Students\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model implements ScholarshipApplicationTraitInterface
{
	use HasFactory, ScholarshipApplicationTrait;

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
		'school_approve' => 'date',
		'company_approve' => 'date',
		'govt_approve' => 'date',
		'admin_approve' => 'date',
		'date_offline_industry' => 'date',
		'date_offline_govt' => 'date',
		'application_year' => 'int',
		'mode_industry' => 'boolean',
		'mode_govt' => 'boolean',
		'application_aadhar_status' => 'boolean',
		'resubmitted_status' => 'boolean',
		'hold' => 'boolean',
		'deleted' => 'boolean',
		'inactive' => 'boolean',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	public function student()
	{
		return $this->belongsTo(User::class, 'student_id')->withDefault();
	}

	public function institute()
	{
		return $this->belongsTo(Institute::class, 'school_id')->withDefault();
	}

	public function industry()
	{
		return $this->belongsTo(Industry::class, 'company_id')->withDefault();
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

	public function industryPayments()
	{
		return $this->hasManyThrough(
			Payment::class,    // Final model we want to access
			Industry::class,   // Intermediate model
			'id',              // Foreign key on the `industries` table (from applications)
			'comp_regd_id',     // Foreign key on the `payments` table
			'company_id',     // Local key on the `applications` table
			'id'               // Local key on the `industries` table
		);
	}

	public function industryPayment()
	{
		return $this->hasOneThrough	(
			Payment::class,    // Final model we want to access
			Industry::class,   // Intermediate model
			'id',              // Foreign key on the `industries` table (from applications)
			'comp_regd_id',     // Foreign key on the `payments` table
			'company_id',     // Local key on the `applications` table
			'id'               // Local key on the `industries` table
		)->orderBy('year', 'desc')->where('status', 1)->where('payments.year', '=', $this->application_year);
		// ->whereColumn('payments.year', 'applications.application_year');
	}
}
