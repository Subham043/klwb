<?php

namespace App\Modules\Cities\Models;

use App\Modules\States\Models\State;
use App\Modules\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

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