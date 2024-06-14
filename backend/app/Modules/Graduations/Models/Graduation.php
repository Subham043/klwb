<?php

namespace App\Modules\Graduations\Models;

use App\Modules\Courses\Models\Course;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model
{
    use HasFactory;

    protected $table = 'graduations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class, 'graduation_id');
    }

}