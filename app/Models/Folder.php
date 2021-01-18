<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;
    protected $table = 'folders';
    protected $primaryKey = 'id';
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function sets()
    {
        return $this->hasMany('App\Models\Set', 'folder_id', 'id');
    }

    public function paginate($total_items, $current_page, $items_per_page)
    {
        return [
            'total_items' => $total_items ,
            'current_page' => $current_page ,
            'items_per_page' => $items_per_page
        ];
    }

    public function minFolderID($user_id)
    {
        return Folder::where('user_id', $user_id)->min('id');
    }

    public function folderDetail($id)
    {
        $folder = $this->where('id',$id)->with('sets')->firstOrFail();
        $folder->total_sets = count($folder->sets);
        $folder->author = $folder->user->name;
        unset($folder->user);
        foreach ($folder->sets as $set) {
            $set->number_of_cards = count($set->cards);
        }
        return $folder;
    }
}
