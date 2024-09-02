<?php

namespace App\Modules\IndustryManagement\Industry\Models;

use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\RegisteredIndustry\Models\RegisteredIndustry;
use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use App\Modules\Students\Users\Traits\RoleTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class IndustryAuth extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, RoleTrait;

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
            get: fn () => $this->reg_doc ? Storage::temporaryUrl($this->reg_doc, now()->addMinutes(5)) : null,
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
            get: fn () => $this->sign ? Storage::temporaryUrl($this->sign, now()->addMinutes(5)) : null,
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
            get: fn () => $this->seal ? Storage::temporaryUrl($this->seal, now()->addMinutes(5)) : null,
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
            get: fn () => $this->pan ? Storage::temporaryUrl($this->pan, now()->addMinutes(5)) : null,
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
            get: fn () => $this->gst ? Storage::temporaryUrl($this->gst, now()->addMinutes(5)) : null,
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

    public function registered_industry()
    {
        return $this->belongsTo(RegisteredIndustry::class, 'reg_industry_id')->withDefault();
    }

}
