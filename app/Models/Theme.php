<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Theme extends Model
{
    use HasFactory;

    public function subject(): BelongsTo {
        return $this->belongsTo(Subject::class);
    }

    public function units():HasMany {
        return $this->hasMany(Unit::class);
    }
}
