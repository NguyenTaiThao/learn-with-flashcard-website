<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use App\Models\Set;
use Exception;

class SetController extends Controller
{
    public function deleteSet(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                if($this->set_model->find($request->set_id) == NULL){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'Set does not exist'
                    ];
                    return response()->json($returnData, 400);
                }else{
                    $this->set_model->find($request->set_id)->delete();
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Delete set successfully'
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function createOrUpdateSet(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
           return $this->tokenNotExist();
        }else{
            try {
                if ($request->id == 0) { // tạo mới set này
                    $set = new Set;
                } else { // trường hợp update 1 set đã có sẵn
                    $set = $this->set_model::find($request->id);
                }
                $set->title = $request->title;
                $set->price = $request->price;
                if ($request->folder_id == 0) { // người dùng không chọn folder cho set
                    $backup_folder = $this->folder_model->minFolderID($user->id);
                    $set->folder_id = $backup_folder;
                } else {
                    $set->folder_id = $request->folder_id;
                }
                $set->save();
                $set_id = $set->id;
                foreach ($request->cards as $key => $value) {
                    if ($value['id'] == 0) { // thêm mới thẻ
                        $card = new Card;
                    } else { //update thẻ
                        $card = $this->card_model::find($value['id']);
                    }
                    $card->front_side = $value['front_side'];
                    $card->back_side = $value['back_side'];
                    $card->remember = $value['remember'];
                    $card->set_id = $set_id;
                    $card->save();
                }
                $set->completed = $this->set_model->completedPercent($set->id);
                $set->save();
                $returnData = [
                    'status' => 1,
                    'msg' => $request->id == 0 ? 'Create Set Successfully' : 'Update Set Successfully',
                    'data' => $set
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function setToFolder(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $set = $this->set_model::Find($request->set_id);
                if ($set->folder_id == $this->folder_model->minFolderID($user->id)
                    || $request->folder_id == $this->folder_model->minFolderID($user->id)) { //đây là trường hợp set chưa thuộc folder nào hoặc folder muốn chuyển tới là "Không thuộc folder nào"
                    $set->folder_id = $request->folder_id; // chỉ cần chuyển ID
                    $set->save();
                } else { // trường hợp đã thuộc 1 nhóm rồi
                    //cần clone set sang folder mới
                    $new_set = $set->replicate();
                    $new_set->folder_id = $request->folder_id;
                    $new_set->completed = 0;
                    $new_set->save();
                    $newSet_id = $new_set->id;
                    //cần clone toàn bộ card có trong set luôn
                    foreach ($set->cards as $key => $value) {
                        $new_card = $value->replicate();
                        $new_card->set_id = $newSet_id;
                        $new_card->save();
                    }
                }
                $returnData = [
                    'status' => 1,
                    'msg' => 'Add Set to Folder successfully!',
                    'data' => $new_set
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function setDetail(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try{
                $set = $this->set_model->setDetail(10);
                $returnData = [
                    'status' => 1,
                    'msg' => 'Get Set\'s detail successfully!',
                    'data' => $set
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                $this->internalServerError($e);
            }
        }
    }
}
