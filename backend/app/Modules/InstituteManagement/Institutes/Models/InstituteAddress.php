<?php

namespace App\Modules\InstituteManagement\Institutes\Models;

use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\States\Models\State;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class InstituteAddress extends Model
{
    use HasFactory, LogsActivity;

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

    protected $recordEvents = ['updated', 'deleted'];

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('institute_'.$this->school->reg_institute_id)
        ->setDescriptionForEvent(
                function(string $eventName){
                    return "Institute with id ".$this->school->reg_institute_id." was {$eventName} by ".request()->user()->current_role;
                }
            )
        ->logFillable()
        ->logOnlyDirty();
        // Chain fluent methods for configuration options
    }

}
