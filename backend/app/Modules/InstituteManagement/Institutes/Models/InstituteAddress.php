<?php

namespace App\Modules\InstituteManagement\Institutes\Models;

use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\States\Models\State;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstituteAddress extends Model
{
    use HasFactory;

    protected $table = 'school_addresses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'address',
        'state_id',
        'city_id',
        'taluq_id',
        'pincode',
        'school_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id')->withDefault();
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }

    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id')->withDefault();
    }

}
