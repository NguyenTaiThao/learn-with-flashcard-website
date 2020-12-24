<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use App\Models\Set;

class SetController extends Controller
{
    protected $user_model;
    protected $set_model;
    protected $folder_model;
    protected $card_model;

    public function __construct(User $user, Set $set, Folder $folder, Card $card)
    {
        $this->user_model = $user;
        $this->set_model = $set;
        $this->folder_model = $folder;
        $this->card_model = $card;
    }

    public function addSet(REQUEST $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            $set = new Set;
            $set->title = $request->title;
            $set->price = $request->price;
            $set->folder_id = $request->folder_id;
            $set->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Create set successfully'
            ];
        }
    }

    public function editSet(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            $set = Set::find($request->set_id);
            $set->title = $request->title;
            $set->price = $request->price;
            $set->folder_id = $request->folder_id;
            $set->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Edit set successfully'
            ];
        }
    }

    public function deleteSet(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            $set = Set::find($request->set_id);
            $set->delete();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Delete set successfully'
            ];
        }
    }

    public function createOrUpdateSet(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
           return $this->tokenNotExist();
        }else{
            if($request->id == 0) // tạo mới set này
            {
                $set = new Set;
            }else // trường hợp update 1 set đã có sẵn
            {
                $set = $this->set_model::find($request->id);
            }
            $set->title = $request->title;
            $set->price = $request->price;
            if($request->folder_id == 0) // người dùng không chọn folder cho set
            {
                $backup_folder = $this->folder_model->minFolderID($user->id);
                $set->folder_id = $backup_folder;
            }else{
                $set->folder_id = $request->folder_id;
            }
            $set->save();
            $set_id = $set->id;
            foreach($request->cards as $key => $value){
                if($value['id'] == 0) // thêm mới thẻ
                {
                    $card = new Card;
                }else{ //update thẻ
                    $card = $this->card_model::find($value['id']);
                }
                $card->front_side = $value['front_side'];
                $card->back_side = $value['back_side'];
                $card->set_id = $set_id;
                $card->save();
            }
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Ok bro!',
                'data' => $set
            ];
        }
    }

    public function setToFolder(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            $set = $this->set_model::Find($request->set_id);
            if ($set->folder_id == $this->folder_model->minFolderID($user->id)) { //đây là trường hợp set chưa thuộc folder nào
                $set->folder_id = $request->folder_id; // chỉ cần chuyển ID
                $set->save();
            }else // trường hợp đã thuộc 1 nhóm rồi
            {
                //cần clone set sang folder mới
                $new_set = $set->replicate();
                $new_set->folder_id = $request->folder_id;
                $new_set->save();
                $newSet_id = $new_set->id;
                //cần clone toàn bộ card có trong set luôn
                foreach($set->cards as $key => $value){
                    
                }
            }
        }
    }
}
