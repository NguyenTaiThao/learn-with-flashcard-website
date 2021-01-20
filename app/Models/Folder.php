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

    public function folderDetail($id, $current_page, $sets_per_page)
    {
        $current_page = intval($current_page);
        $offset = ($current_page - 1) * $sets_per_page;
        $folder = $this->where('id',$id)->firstOrFail();
        $folder->total_sets = count($folder->sets);
        $folder->author = $folder->user->name;
        $paginate = $this->paginate($folder->total_sets, $current_page, $sets_per_page);
        unset($folder->sets);
        $sets = Set::where('sets.folder_id', $folder->id)->limit($sets_per_page)->offset($sets_per_page)->get();
        $folder->sets = $sets;
        $data['paginate'] = $paginate;
        $data['folders'] = $folder;
        unset($folder->user);
        return $data;
    }
}
