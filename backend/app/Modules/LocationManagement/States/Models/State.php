<?php

namespace App\Modules\LocationManagement\States\Models;

use App\Http\Traits\AuthTrait;
use App\Modules\LocationManagement\Cities\Models\City;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory, AuthTrait;

    protected $table = 'states';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
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

    public function cities()
    {
        return $this->hasMany(City::class, 'state_id');
    }

}
