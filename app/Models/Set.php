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

    public function completedPercent($id)
    {
        $set = $this->find($id);
        return round(count($set->cards()->where('remember', 1)->get()) / count($set->cards) *100);
    }

    public function recentSets($user_id){
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit(5)
                    ->with('cards')
                    ->get('sets.*');
        foreach ($sets as $key => $value) {
            $value->number_of_cards = count($value->cards);
        }
        return $sets;
    }


}
