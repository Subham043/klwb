<?php

namespace App\Modules\Admins\RequestIndustry\Models;

use App\Modules\LocationManagement\Cities\Models\City;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class RequestIndustry extends Model
{
    use HasFactory;

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
        'category',
        'category',
        'address',
        'register_doc',
        'city_id',
        'taluq_id',
        'reject_reason',
        'status',
    ];

    protected $attributes = [
        'company' => null,
        'email' => null,
        'mobile' => null,
        'gst_no' => null,
        'pan_no' => null,
        'act' => null,
        'category' => null,
        'address' => null,
        'register_doc' => null,
        'reject_reason' => null,
        'status' => 0,
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $register_doc_path = 'reg-file';

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
            get: fn () => ($this->register_doc && Storage::exists($this->register_doc)) ? Storage::temporaryUrl($this->register_doc, now()->addMinutes(20)) : null,
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
