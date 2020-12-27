<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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

    public function listSetsByTime($user_id){
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->whereBetween('sets.created_at', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])
                    ->get('sets.*');
        foreach ($sets as $key => $value) {
            $value->number_of_cards = count($value->cards);
        }
        $data['this_week'] = $sets;
        for($month = 1; $month <= 12; $month++){
            $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                        ->where('folders.user_id', $user_id)
                        ->whereYear('sets.created_at', Carbon::now()->year)
                        ->whereMonth('sets.created_at', $month)
                        ->get('sets.*');
            foreach ($sets as $key => $value) {
                $value->number_of_cards = count($value->cards);
            }
            $data[$month] = $sets;
        }
        return $data;
    }

    public function setDetail($id)
    {
        $set = $this->where('id',$id)->with('cards')->first();
        $set->total_cards = count($set->cards);
        $set->remembered_cards = count($set->cards()->where('remember', 1)->get());
        return $set;
    }
}
