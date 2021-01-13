<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\User;
use phpDocumentor\Reflection\PseudoTypes\False_;

class Set extends Model
{
    use HasFactory;
    protected $table = "sets";

    protected $fillable = [
        'title',
        'price',
        'folder_id',
        'number_of_cards',
        'completed',
        'is_purchased',
        'bought_times'
    ];

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
        return round(count($set->cards()->where('remember', 1)->get()) / $set->number_of_cards *100);
    }

    public function recentSets($user_id){
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit(5)
                    ->with('cards')
                    ->get('sets.*');
        return $sets;
    }

    public function listSetsByTime($user_id){
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->whereBetween('sets.created_at', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])
                    ->get('sets.*');
        $data['this_week'] = $sets;
        for($month = 1; $month <= 12; $month++){
            $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                        ->where('folders.user_id', $user_id)
                        ->whereYear('sets.created_at', Carbon::now()->year)
                        ->whereMonth('sets.created_at', $month)
                        ->get('sets.*');
            $data[$month] = $sets;
        }
        return $data;
    }

    public function setDetail($id)
    {
        $set = $this->where('id',$id)->with('cards')->first();
        $set->remembered_cards = count($set->cards()->where('remember', 1)->get());
        return $set;
    }

    public function multipleChoiceGame($id)
    {
        $set = $this->where('id',$id)->with('cards')->first();
        $questions = [];
        $multiple_choice = [];
        $data = [];
        foreach ($set->cards as $key => $value) {
            $questions[$key] = $value->front_side;
            $multiple_choice[$key] = $value->back_side;
        }
        $data['number_of_questions'] = count($set->cards);
        if ($data['number_of_questions'] >= 4) {
            $question = [];
            foreach ($questions as $key => $value) {
                $question['question'] = $value;
                $question['CORRECT ANSWER'] = $multiple_choice[$key];
                $numbers = range(0, count($questions)-1);
                unset($numbers[$key]);
                shuffle($numbers);
                $random_numbers = array_slice($numbers, 0, 3);
                array_push($random_numbers, $key);
                shuffle($random_numbers);
                $question['answer 1'] = $multiple_choice[$random_numbers[0]];
                $question['answer 2'] = $multiple_choice[$random_numbers[1]];
                $question['answer 3'] = $multiple_choice[$random_numbers[2]];
                $question['answer 4'] = $multiple_choice[$random_numbers[3]];
            }
            $data['questions'] = $question;
            return $data;
        }else{
            return $data;
        }
    }

    public function removeCard($set_id, $card_received)
    {
        $set = $this->where('id',$set_id)->first();
        $deleted = 0;
        foreach ($set->cards as $card) {
            if(!in_array($card->id, $card_received)){
                $card->delete();
                $deleted++;
            }
        }
        $set->number_of_cards = count($set->cards) - $deleted;
        $set->save();
    }

    public function allCompletedSet($user_id)
    {
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', "=", $user_id], ['sets.completed', "=", 100]])
                    ->get('sets.*');
        return count($sets);
    }

    public function allCreatedSets($user_id)
    {
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', "=", $user_id], ['sets.is_purchased', "=", 0]])
                    ->get('sets.*');
        return count($sets);
    }


    public function completedSets($current_page, $sets_per_page, $user_id)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', "=", $user_id], ['sets.completed', "=", 100]])
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit($sets_per_page)
                    ->offset($offset)
                    ->get('sets.*');
        $paginate = $this->paginate($this->allCompletedSet($user_id), $current_page, $sets_per_page);
        $data['paginate'] = $paginate;
        $data['sets'] = $sets;
        return $data;
    }

    public function createdSets($current_page, $sets_per_page, $user_id)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', "=", $user_id], ['sets.is_purchased', "=", 0]])
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit($sets_per_page)
                    ->offset($offset)
                    ->get('sets.*');
        $paginate = $this->paginate($this->allCreatedSets($user_id), $current_page, $sets_per_page);
        $data['paginate'] = $paginate;
        $data['sets'] = $sets;
        return $data;
    }


    public function countAllSets($user_id)
    {
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->get('sets.*');
        return count($sets);
    }


    public function allSets($current_page, $sets_per_page, $user_id)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit($sets_per_page)
                    ->offset($offset)
                    ->get('sets.*');
        $paginate = $this->paginate($this->countAllSets($user_id), $current_page, $sets_per_page);
        $data['paginate'] = $paginate;
        $data['sets'] = $sets;
        return $data;
    }

    public function countNoFolderSets($user_id)
    {
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', $user_id], ['sets.folder_id', 1]])
                    ->get('sets.*');
        return count($sets);
    }


    public function noFolderSets($current_page, $sets_per_page, $user_id)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where([['folders.user_id', $user_id], ['sets.folder_id', 1]])
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit($sets_per_page)
                    ->offset($offset)
                    ->get('sets.*');
        $paginate = $this->paginate($this->countNoFolderSets($user_id), $current_page, $sets_per_page);
        $data['paginate'] = $paginate;
        $data['sets'] = $sets;
        return $data;
    }



    public function countSetWithPriceAndName($price, $keyword)
    {
        if($price == 0){
            $sets = $this->where([['price', 0],['title', 'LIKE', '%'.$keyword.'%']])->get();
            return count($sets);
        }else if($price == -1){
            $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%']])->get();
            return count($sets);
        }else if($price == -2){
            $sets = $this->where('title', 'LIKE', '%'.$keyword.'%')->get();
            return count($sets);
        }
    }

    public function search($current_page, $sets_per_page, $keyword, $price, $type)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        if ($type == 1) { //tìm học phần
            //price: 0 => free
            //price: -1 => no free
            //price: -2 => all
            if ($price == 0) { //FREE
                $sets = $this->where([['price', 0],['title', 'LIKE', '%'.$keyword.'%']])
                            ->orderBy('sets.updated_at', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                $data['paginate'] = $paginate;
                $data['sets'] = $sets;
                return $data;
            } elseif ($price == -1) { //NO FREE
                $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%']])
                            ->orderBy('sets.updated_at', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                $data['paginate'] = $paginate;
                $data['sets'] = $sets;
                return $data;
            } else {
                $sets = $this->where('title', 'LIKE', '%'.$keyword.'%')
                            ->orderBy('sets.updated_at', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                foreach ($sets as $set) {
                    $set->author = $set->folder->user->name;
                    unset($set->folder);
                }
                $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                $data['paginate'] = $paginate;
                $data['sets'] = $sets;
                return $data;
            }
        }else{ //tìm người dùng
            $users = User::where('name', 'LIKE', '%'.$keyword.'%')
                        ->limit($sets_per_page)
                        ->offset($offset)
                        ->get();
            foreach ($users as $user) {
                $user->sets = $this->recentSets($user->id);
            }
            $paginate = $this->paginate(User::countUserWithName($keyword), $current_page, $sets_per_page);
            $data['paginate'] = $paginate;
            $data['users'] = $users;
            return $data;
        }
    }
}
