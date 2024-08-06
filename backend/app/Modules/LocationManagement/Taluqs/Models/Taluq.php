<?php

namespace App\Modules\LocationManagement\Taluqs\Models;

use App\Modules\LocationManagement\Cities\Models\City;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Taluq extends Model
{
    use HasFactory;

    protected $table = 'taluqs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'city_id',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
    ];

    protected $casts = [
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

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }

}
