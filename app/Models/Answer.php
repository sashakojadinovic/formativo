<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory;

    public function student():BelongsTo {
        return $this->belongsTo(Student::class);
    }
    public function question():BelongsTo {
        return $this->belongsTo(Question::class);
    }
    public function assessment():BelongsTo {
        return $this->belongsTo(Assessment::class);
    }
}
