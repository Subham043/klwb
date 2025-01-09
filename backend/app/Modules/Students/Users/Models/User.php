<?php

namespace App\Modules\Students\Users\Models;

use App\Http\Enums\Guards;
use App\Http\Interfaces\RoleTraitInterface;
use App\Http\Traits\RoleTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Database\Factories\UserFactory;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class User extends Authenticatable implements MustVerifyEmail, RoleTraitInterface
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, RoleTrait, LogsActivity;

    protected $table = 'users';

    protected $guard = Guards::Web;

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
        return (config('app.client_url').'/auth/student/reset-password/');
    }

    public function getLoginClientLink(): string
    {
        return (config('app.client_url').'/auth/student/login');
    }

    /**
     * User Factory.
     *
     */
    protected static function newFactory(): Factory
    {
        return UserFactory::new();
    }

    public function hasVerifiedEmail(): bool
    {
        return !is_null($this->verified_at);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('student_'.$this->id)
        ->setDescriptionForEvent(
                function(string $eventName){
                    // $desc = $this->name."<".$this->email."> has been {$eventName}";
                    // $desc .= auth()->user() ? " by ".auth()->user()->name."<".auth()->user()->email.">" : "";
                    return "Student with id ".$this->id." was {$eventName} by ".request()->user()->current_role;
                }
            )
        // ->logOnly(['name', 'email', 'phone', 'is_blocked']);
        ->logFillable()
        ->logExcept(['otp', 'password'])
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
        // Chain fluent methods for configuration options
    }

}
