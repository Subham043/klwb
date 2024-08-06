<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Models;

use App\Http\Traits\AuthTrait;
use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationDate extends Model
{
    use HasFactory, AuthTrait;

    protected $table = 'application_dates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'from_date',
        'to_date',
        'verification_end_date',
        'approval_end_date',
        'application_year',
        'user_id',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
    ];

    protected $casts = [
        'from_date' => 'datetime',
        'to_date' => 'datetime',
        'approval_end_date' => 'datetime',
        'verification_end_date' => 'datetime',
        'application_year' => 'int',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(Employee::class, 'user_id')->withDefault();
    }

}
