<?php

namespace App\Modules\LocationManagement\Cities\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\LocationManagement\States\Models\State;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

    protected $table = 'cities';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'state_id',
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

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id')->withDefault();
    }

    public function taluqs()
    {
        return $this->hasMany(Taluq::class, 'city_id');
    }

}
