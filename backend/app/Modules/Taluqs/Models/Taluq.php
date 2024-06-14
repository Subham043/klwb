<?php

namespace App\Modules\Taluqs\Models;

use App\Modules\Cities\Models\City;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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