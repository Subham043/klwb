<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Models;

use App\Http\Traits\AuthTrait;
use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class RequestIndustry extends Model
{
    use HasFactory, AuthTrait;

    protected $table = 'request_industries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company',
        'email',
        'mobile',
        'gst_no',
        'pan_no',
        'act',
        'address',
        'register_doc',
        'city_id',
        'taluq_id',
        'is_active',
    ];

    protected $attributes = [
        'company' => null,
        'email' => null,
        'mobile' => null,
        'gst_no' => null,
        'pan_no' => null,
        'act' => null,
        'address' => null,
        'register_doc' => null,
        'is_active' => true,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $register_doc_path = 'reg-doc';

    protected $appends = ['register_doc_link'];

    protected function registerDoc(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->register_doc_path.'/'.$value,
        );
    }

    protected function registerDocLink(): Attribute
    {
        return new Attribute(
            get: fn () => $this->register_doc ? Storage::temporaryUrl($this->register_doc, now()->addMinutes(5)) : null,
        );
    }

    public function taluq()
    {
        return $this->belongsTo(Taluq::class, 'taluq_id')->withDefault();
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->withDefault();
    }

}
