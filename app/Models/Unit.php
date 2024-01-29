<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    use HasFactory;
    public function theme(): BelongsTo {
        return $this->belongsTo(Theme::class);
    }

/*     public function questions():HasMany {
        return $this->hasMany(Question::class);
    }*/
    public function outcomes():HasMany {
        return $this->hasMany(Outcome::class);
    }
} 
