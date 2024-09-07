<?php

namespace App\Modules\CourseManagement\Graduations\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\Admins\Fees\Models\Fee;
use App\Modules\CourseManagement\Courses\Models\Course;
use App\Modules\Students\Scholarship\Models\ApplicationMark;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

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

    protected $attributes = [
        'is_active' => true,
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
    
    public function marks_obtained()
    {
        return $this->hasMany(ApplicationMark::class, 'graduation_id');
    }

    public function fees()
    {
        return $this->hasMany(Fee::class, 'graduation_id');
    }
    
    public function scholarship_fee()
    {
        return $this->hasOne(Fee::class, 'graduation_id')->where('year', '<=', $this->marks_obtained()->application->application_year ?? date('Y'))->latestOfMany();
    }

}
