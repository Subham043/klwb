<?php

namespace App\Modules\LocationManagement\Taluqs\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\LocationManagement\Cities\Models\City;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taluq extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

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

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }

}
