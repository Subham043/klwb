<?php

namespace App\Modules\Admins\ApplicationDates\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ApplicationDate extends Model implements AuthTraitInterface
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
        'application_year',
        'user_id',
        'can_resubmit',
        'can_approve',
        'can_verify',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
        'can_resubmit' => true,
        'can_approve' => true,
        'can_verify' => true,
    ];

    protected $casts = [
        'from_date' => 'date',
        'to_date' => 'date',
        'application_year' => 'int',
        'is_active' => 'boolean',
        'can_resubmit' => 'boolean',
        'can_approve' => 'boolean',
        'can_verify' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['has_expired'];

    protected function hasExpired(): Attribute
    {
        return new Attribute(
            get: fn () => !(now()->between($this->from_date->format('Y-m-d'), $this->to_date->addDay(1)->format('Y-m-d'))),
        );
    }

    public function user()
    {
        return $this->belongsTo(Employee::class, 'user_id')->withDefault();
    }

}
