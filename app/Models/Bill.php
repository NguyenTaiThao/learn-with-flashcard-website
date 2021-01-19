<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = 'bills';
    use HasFactory;

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
