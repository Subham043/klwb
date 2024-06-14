<?php

namespace App\Modules\Fees\Models;

use App\Modules\Classes\Models\Classes;
use App\Modules\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    protected $table = 'fees';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'year',
        'class_id',
        'user_id',
        'is_active',
    ];

    protected $casts = [
        'amount' => 'int',
        'year' => 'int',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function classes()
    {
        return $this->belongsTo(Classes::class, 'class_id')->withDefault();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

}