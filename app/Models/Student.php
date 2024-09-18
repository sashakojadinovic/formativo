<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    public  function classDepartment(): BelongsTo
    {
        return $this->belongsTo(ClassDepartment::class);
    }
    public function answers():HasMany {
        return $this->hasMany(Answer::class);
    }
    public function achievements():HasMany {
        return $this->hasMany(Achievement::class);
    }
}
