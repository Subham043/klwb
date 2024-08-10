<?php

namespace App\Modules\ApplicationManagement\Fees\Models;

use App\Http\Traits\AuthTrait;
use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\CourseManagement\Graduations\Models\Graduation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory, AuthTrait;

    protected $table = 'fees';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'year',
        'graduation_id',
        'user_id',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
    ];

    protected $casts = [
        'amount' => 'int',
        'year' => 'int',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function graduation()
    {
        return $this->belongsTo(Graduation::class, 'graduation_id')->withDefault();
    }

    public function user()
    {
        return $this->belongsTo(Employee::class, 'user_id')->withDefault();
    }

}
