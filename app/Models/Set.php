<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\User;
use phpDocumentor\Reflection\PseudoTypes\False_;
use PhpParser\Node\Stmt\Foreach_;

class Set extends Model
{
    use HasFactory;
    protected $table = "sets";
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'price',
        'folder_id',
        'number_of_cards',
        'completed',
        'is_purchased',
        'bought_times'
    ];


    public function paginate($total_items, $current_page, $items_per_page)
    {
        return [
            'total_items' => $total_items ,
            'current_page' => $current_page ,
            'items_per_page' => $items_per_page
        ];
    }

    public function folder()
    {
        return $this->belongsTo('App\Models\Folder', 'folder_id', 'id');
    }

    public function cards()
    {
        return $this->hasMany('App\Models\Card', 'set_id', 'id');
    }

    public function bill()
    {
        return $this->hasOne('App\Models\BillDetail', 'set_id', 'id');
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
        $duplicate_sets = []; $i = 0;
        foreach ($sets as $key => $value) {
            $duplicate_sets[$i++] = $value->id;
        }
        $this_month = Carbon::now()->month;
        for ($month = 1; $month <= 12; $month++) {
            if ($month == $this_month) {
                $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                        ->where('folders.user_id', $user_id)
                        ->whereYear('sets.created_at', Carbon::now()->year)
                        ->whereMonth('sets.created_at', $month)
                        ->whereNotIn('sets.id', $duplicate_sets)
                        ->get('sets.*');
                $data[$month] = $sets;
            } else {
                $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                            ->where('folders.user_id', $user_id)
                            ->whereYear('sets.created_at', Carbon::now()->year)
                            ->whereMonth('sets.created_at', $month)
                            ->get('sets.*');
                $data[$month] = $sets;
            }
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
        $data['questions'] = [];
        if ($data['number_of_questions'] >= 4) {
            $question = [];
            foreach ($questions as $key => $value) {
                $question['question'] = $value;
                $question['CORRECT_ANSWER'] = $multiple_choice[$key];
                $numbers = range(0, count($questions)-1);
                unset($numbers[$key]);
                shuffle($numbers);
                $random_numbers = array_slice($numbers, 0, 3);
                array_push($random_numbers, $key);
                shuffle($random_numbers);
                $question['answer_1'] = $multiple_choice[$random_numbers[0]];
                $question['answer_2'] = $multiple_choice[$random_numbers[1]];
                $question['answer_3'] = $multiple_choice[$random_numbers[2]];
                $question['answer_4'] = $multiple_choice[$random_numbers[3]];
                array_push($data['questions'], $question);
            }
            shuffle($data['questions']);
            return $data;
        }else{
            return $data;
        }
    }

    public function fillBlankGame($id)
    {
        $set = $this->where('id',$id)->with('cards')->first();
        $data = [];
        $data['questions'] = [];
        $question = [];
        $data['number_of_questions'] = count($set->cards);
        foreach ($set->cards as $key => $value) {
            $question['mean'] = $value->back_side;
            $question['correct_answer'] = $value->front_side;
            array_push($data['questions'], $question);
        }
        shuffle($data['questions']);
        return $data;
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

    public function countNoFolderSets($user_id, $min_folder, $folder_id)
    {
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->whereIn('sets.folder_id', [$min_folder, $folder_id])
                    ->get('sets.*');
        return count($sets);
    }


    public function noFolderSets($current_page, $sets_per_page, $user_id, $min_folder, $folder_id)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        $sets = Set::join('folders', 'folders.id', '=', 'sets.folder_id')
                    ->where('folders.user_id', $user_id)
                    ->whereIn('sets.folder_id', [$min_folder, $folder_id])
                    ->orderBy('sets.updated_at', 'desc')
                    ->limit($sets_per_page)
                    ->offset($offset)
                    ->get('sets.*');
        $paginate = $this->paginate($this->countNoFolderSets($user_id, $min_folder, $folder_id), $current_page, $sets_per_page);
        foreach ($sets as $set) {
            if($set->folder_id == $folder_id){
                $set->was_in = 1;
            }else{
                $set->was_in = 0;
            }
        }
        $data['paginate'] = $paginate;
        $data['sets'] = $sets;
        return $data;
    }



    public function countSetWithPriceAndName($price, $keyword)
    {
        if($price == 0){
            $sets = $this->where([['price', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])->get();
            foreach ($sets as $key => $set) {
                if(count($set->cards) < 3){
                    $sets->forget($key);
                }
            }
            return count($sets);
        }else if($price == -1){
            $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])->get();
            foreach ($sets as $key => $set) {
                if(count($set->cards) < 3){
                    $sets->forget($key);
                }
            }
            return count($sets);
        }else if($price == -2){
            $sets = $this->where([['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])->get();
            foreach ($sets as $key => $set) {
                if(count($set->cards) < 3){
                    $sets->forget($key);
                }
            }
            return count($sets);
        }
    }

    public function search($current_page, $sets_per_page, $keyword, $price, $type, $sort)
    {
        $offset = ($current_page - 1) * $sets_per_page;
        if ($type == 1) { //tìm học phần
            //price: 0 => free
            //price: -1 => no free
            //price: -2 => all
            if ($price == 0) { //FREE
                $sets = $this->where([['price', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.updated_at', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                foreach ($sets as $key => $set) {
                    $set->author = $set->folder->user->name;
                    unset($set->folder);
                    if(count($set->cards) < 3){
                        $sets->forget($key);
                    }
                }
                $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                $data['paginate'] = $paginate;
                $data['sets'] = $sets;
                return $data;
            } else if ($price == -1) { //NO FREE
                if($sort == 1){
                    $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.price', 'asc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }else if($sort == 2){
                    $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.price', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }else{
                    $sets = $this->where([['price', '>', 0],['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                                ->orderBy('sets.updated_at', 'desc')
                                ->with('cards')
                                ->limit($sets_per_page)
                                ->offset($offset)
                                ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }
            } else {
                if($sort == 1){
                    $sets = $this->where([['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.price', 'asc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }else if($sort == 2){
                    $sets = $this->where([['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.price', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }else{
                    $sets = $this->where([['title', 'LIKE', '%'.$keyword.'%'], ['is_purchased', 0]])
                            ->orderBy('sets.updated_at', 'desc')
                            ->with('cards')
                            ->limit($sets_per_page)
                            ->offset($offset)
                            ->get('sets.*');
                    foreach ($sets as $key => $set) {
                        $set->author = $set->folder->user->name;
                        unset($set->folder);
                        if(count($set->cards) < 3){
                            $sets->forget($key);
                        }
                    }
                    $paginate = $this->paginate($this->countSetWithPriceAndName($price, $keyword), $current_page, $sets_per_page);
                    $data['paginate'] = $paginate;
                    $data['sets'] = $sets;
                    return $data;
                }
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

    public function getCart($cart)
    {
        $data = [];
        $sets = $this->whereIn('id', $cart)->get();
        $total_price = 0;
        foreach ($sets as $key => $value) {
            $total_price += $value->price;
        }
        $data['sets'] = $sets;
        $data['total_price'] = $total_price;
        return $data;
    }
}
