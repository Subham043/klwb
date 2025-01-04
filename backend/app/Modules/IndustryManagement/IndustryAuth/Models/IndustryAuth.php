<?php

namespace App\Modules\IndustryManagement\IndustryAuth\Models;

use App\Http\Enums\Guards;
use App\Http\Interfaces\RoleTraitInterface;
use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use App\Http\Traits\RoleTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class IndustryAuth extends Authenticatable implements MustVerifyEmail, RoleTraitInterface
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, RoleTrait, LogsActivity;

    protected $table = 'industry_auths';

    protected $guard = Guards::Industry;

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
        'reg_industry_id',
        'gst_no',
        'pan_no',
        'gst',
        'pan',
        'address',
        'reg_doc',
        'sign',
        'seal',
        'city_id',
        'taluq_id',
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
        'address' => null,
        'reg_doc' => null,
        'sign' => null,
        'seal' => null,
        'gst' => null,
        'pan' => null,
        'gst_no' => null,
        'pan_no' => null,
    ];

    protected $appends = ['current_role', 'reg_doc_link', 'sign_link', 'seal_link', 'gst_link', 'pan_link'];

    protected $recordEvents = ['updated', 'deleted'];

    public $reg_doc_path = 'reg-doc';
    public $sign_path = 'sign-doc';
    public $seal_path = 'seal-doc';
    public $gst_path = 'gst';
    public $pan_path = 'pan';

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

    protected function regDoc(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->reg_doc_path.'/'.$value,
        );
    }

    protected function regDocLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->reg_doc && Storage::exists($this->reg_doc)) ? Storage::temporaryUrl($this->reg_doc, now()->addMinutes(20)) : null,
        );
    }

    protected function sign(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->sign_path.'/'.$value,
        );
    }

    protected function signLink(): Attribute
    {
        return new Attribute(
            get: fn () =>( $this->sign && Storage::exists($this->sign)) ? Storage::temporaryUrl($this->sign, now()->addMinutes(20)) : null,
        );
    }

    protected function seal(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->seal_path.'/'.$value,
        );
    }

    protected function sealLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->seal && Storage::exists($this->seal)) ? Storage::temporaryUrl($this->seal, now()->addMinutes(20)) : null,
        );
    }

    protected function pan(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->pan_path.'/'.$value,
        );
    }

    protected function panLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->pan && Storage::exists($this->pan)) ? Storage::temporaryUrl($this->pan, now()->addMinutes(20)) : null,
        );
    }

    protected function gst(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->gst_path.'/'.$value,
        );
    }

    protected function gstLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->gst && Storage::exists($this->gst)) ? Storage::temporaryUrl($this->gst, now()->addMinutes(20)) : null,
        );
    }

    public function getResetPasswordClientLink(): string 
    {
        return (config('app.client_url').'/auth/industry/reset-password/');
    }

    public function getLoginClientLink(): string 
    {
        return (config('app.client_url').'/auth/industry/login');
    }

    public function hasVerifiedEmail() 
    {
        return !is_null($this->verified_at);
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }

    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'reg_industry_id')->withDefault();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('industry_'.$this->reg_industry_id)
        ->setDescriptionForEvent(
                function(string $eventName){
                    return "Industry with id ".$this->reg_industry_id." was {$eventName} by ".request()->user()->current_role;
                }
            )
        ->logFillable()
        ->logOnlyDirty();
        // Chain fluent methods for configuration options
    }

}
