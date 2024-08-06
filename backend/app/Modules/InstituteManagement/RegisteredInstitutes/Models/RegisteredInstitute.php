<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Models;

use App\Modules\InstituteManagement\RegisteredInstitutes\Enums\UrbanRural;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisteredInstitute extends Model
{
    use HasFactory;

    protected $table = 'registered_institutes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reg_no',
        'name',
        'management_type',
        'category',
        'type',
        'urban_rural',
        'taluq_id',
        'is_active',
    ];

    protected $attributes = [
        'reg_no' => null,
        'urban_rural' => UrbanRural::RURAL,
        'is_active' => true,
    ];

    protected $casts = [
        'urban_rural' => UrbanRural::class,
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeCheckAuth(Builder $query): Builder
    {
        if(auth()->check() && request()->user()->hasRole('Verification-Officer|Financial-Officer|Payment-Officer|Industry|Institute|Student')) {
            return $query->where('is_active', true);
        }
        return $query;
    }

    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

}
