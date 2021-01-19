<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillDetail extends Model
{
    use HasFactory;
    protected $table = 'bills';
    use HasFactory;

    public function bill()
    {
        return $this->belongsTo('App\Models\Bill', 'bill_id', 'id');
    }

    public function set()
    {
        return $this->hasOne('App\Models\Set', 'set_id', 'id');
    }
}
