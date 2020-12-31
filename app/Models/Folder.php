<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;
    protected $table = 'folders';

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function sets()
    {
        return $this->hasMany('App\Models\Set', 'folder_id', 'id');
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
        foreach ($folder->sets as $set) {
            $set->number_of_cards = count($set->cards);
        }
        return $folder;
    }
}
