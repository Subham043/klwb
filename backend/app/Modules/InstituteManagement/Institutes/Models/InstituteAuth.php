<?php

namespace App\Modules\InstituteManagement\Institutes\Models;

use App\Http\Enums\Guards;
use App\Http\Interfaces\RoleTraitInterface;
use App\Http\Traits\RoleTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class InstituteAuth extends Authenticatable implements MustVerifyEmail, RoleTraitInterface
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, RoleTrait, LogsActivity;

    protected $table = 'school_auths';

    protected $guard = Guards::Institute;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'otp',
        'password',
        'verified_at',
        'is_blocked',
        'created_by',
        'school_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $attributes = [
        'is_blocked' => false,
    ];

    protected $appends = ['current_role'];

    protected $recordEvents = ['updated', 'deleted'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_blocked' => 'boolean',
            'verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getResetPasswordClientLink(): string
    {
        return (config('app.client_url').'/auth/institute/reset-password/');
    }

    public function getLoginClientLink(): string 
    {
        return (config('app.client_url').'/auth/institute/login');
    }

    public function hasVerifiedEmail() {
        return !is_null($this->verified_at);
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id')->withDefault();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('institute_'.$this->school->reg_institute_id)
        ->setDescriptionForEvent(
                function(string $eventName){
                    return "Institute with id ".$this->school->reg_institute_id." was {$eventName} by ".request()->user() ? (request()->user()->current_role ?? "Institute") : "Institute";
                }
            )
        ->logFillable()
        ->logExcept(['school_id', 'otp', 'password'])
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
        // Chain fluent methods for configuration options
    }

}
