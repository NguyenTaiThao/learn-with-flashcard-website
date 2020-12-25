<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
    use HasFactory;
    protected $table = "sets";

    public function folder()
    {
        return $this->belongsTo('App\Models\Folder', 'folder_id', 'id');
    }

    public function cards()
    {
        return $this->hasMany('App\Models\Card', 'set_id', 'id');
    }
    
    public function bills()
    {
        return $this->belongsToMany('App\Bill', 'role_user_table', 'set_id', 'bill_id');
    }

    public function recentSets($user_id){
        $data = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit(5)
                    ->get('sets.*');
        return $data;
    }
}
