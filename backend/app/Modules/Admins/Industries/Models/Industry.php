<?php

namespace App\Modules\Admins\Industries\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\States\Models\State;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Industry extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

    protected $table = 'registered_industries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reg_id',
        'name',
        'act',
        'pincode',
        'state_id',
        'city_id',
        'taluq_id',
        'is_active',
    ];

    protected $attributes = [
        'reg_id' => null,
        'act' => null,
        'pincode' => null,
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
    
    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }
    
    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

    public function auth()
    {
        return $this->hasOne(IndustryAuth::class, 'reg_industry_id')->withDefault();
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'comp_regd_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'comp_regd_id')->latestOfMany('year', 'desc');
    }

}
