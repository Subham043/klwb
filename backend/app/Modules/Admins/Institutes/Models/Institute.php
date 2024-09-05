<?php

namespace App\Modules\Admins\Institutes\Models;

use App\Http\Traits\AuthTrait;
use App\Modules\InstituteManagement\Institutes\Models\School;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    use HasFactory, AuthTrait;

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
        'management_type' => null,
        'category' => null,
        'type' => null,
        'urban_rural' => null,
        'is_active' => true,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

    public function auth()
    {
        return $this->hasOne(School::class, 'reg_institute_id')->withDefault();
    }

}
