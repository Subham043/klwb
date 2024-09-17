<?php

namespace App\Modules\Admins\RequestInstitutes\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class RequestInstitute extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

    protected $table = 'request_institutes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'pincode',
        'address',
        'register_doc',
        'taluq_id',
        'is_active',
    ];

    protected $attributes = [
        'name' => null,
        'email' => null,
        'mobile' => null,
        'pincode' => null,
        'address' => null,
        'register_doc' => null,
        'is_active' => true,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $register_doc_path = 'regfile';

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

}
