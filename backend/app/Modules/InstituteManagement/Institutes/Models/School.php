<?php

namespace App\Modules\InstituteManagement\Institutes\Models;

use App\Modules\Admins\Institutes\Models\Institute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class School extends Model
{
    use HasFactory;

    protected $table = 'schools';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reg_no',
        'principal',
        'email',
        'phone',
        'reg_certification',
        'principal_signature',
        'seal',
        'reg_institute_id',
    ];

    protected $attributes = [
        'reg_certification' => null,
        'principal_signature' => null,
        'seal' => null,
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $reg_certification_path = 'regfile';
    public $principal_signature_path = 'signature';
    public $seal_path = 'seal';

    protected $appends = ['reg_certification_link', 'principal_signature_link', 'seal_link'];

    protected function regCertification(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->reg_certification_path.'/'.$value,
        );
    }

    protected function regCertificationLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->reg_certification && Storage::exists($this->reg_certification)) ? Storage::temporaryUrl($this->reg_certification, now()->addMinutes(20)) : null,
        );
    }

    protected function principalSignature(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->principal_signature_path.'/'.$value,
        );
    }

    protected function principalSignatureLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->principal_signature && Storage::exists($this->principal_signature)) ? Storage::temporaryUrl($this->principal_signature, now()->addMinutes(20)) : null,
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

    public function institute()
    {
        return $this->belongsTo(Institute::class, 'reg_institute_id')->withDefault();
    }

    public function address()
    {
        return $this->hasOne(InstituteAddress::class, 'school_id')->withDefault();
    }

    public function profile()
    {
        return $this->hasOne(InstituteAuth::class, 'school_id')->withDefault();
    }

}
