<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = 'cards';
    protected $primaryKey = 'id';
    use HasFactory;
    public function set()
    {
        return $this->belongsTo('App\Models\Set', 'set_id', 'id');
    }
}
