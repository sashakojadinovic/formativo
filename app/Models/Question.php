<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;
/*     public function unit(): BelongsTo {
        return $this->belongsTo(Unit::class);
    }
 */
    public function results():HasMany {
        return $this->hasMany(Answer::class);
    }

    public function outcomes():BelongsToMany {
        return $this->belongsToMany(Outcome::class);
    }
}
