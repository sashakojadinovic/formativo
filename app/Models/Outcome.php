<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Outcome extends Model
{
    use HasFactory;

    public function questions():BelongsToMany{
        return $this->belongsToMany(Question::class);
    }
    public function unit():BelongsTo {
        return $this->belongsTo(Unit::class);
    }

}
