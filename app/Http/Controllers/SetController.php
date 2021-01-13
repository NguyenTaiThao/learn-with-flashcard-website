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

    protected $sets_per_page = 6;

    public function deleteSet(Request $request)
    {
        $token = $request->header("token");
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
        $token = $request->header("token");
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
                $card_received = [];
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
                    array_push($card_received, $card->id);
                }
                //dd($card_received);
                $this->set_model->removeCard($set->id, $card_received);
                $set->completed = $this->set_model->completedPercent($set->id);
                $set->save();
                $set_id = $set->id;
                $returnData = [
                    'status' => 1,
                    'msg' => $request->id == 0 ? 'Create Set Successfully' : 'Update Set Successfully',
                    'data' => $this->set_model->where('id',$set_id)->firstOrFail()
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
                $set = $this->set_model->setDetail($request->id);
                if($set == NULL){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'This Set does not exist!'
                    ];
                    return response()->json($returnData, 400);
                }else{
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Get Set\'s detail successfully!',
                        'data' => $set
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                $this->internalServerError($e);
            }
        }
    }

    public function multipleChoiceGame(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try{
                $set = $this->set_model->multipleChoiceGame($request->id);
                if($set['number_of_questions'] < 4){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'Không đủ số thẻ để chơi. Cần ít nhất 4 thẻ.',
                        'number_of_questions' => $set["number_of_questions"]
                    ];
                    return response()->json($returnData, 500);
                }else{
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Tạo game Trắc ngiệm thành công!',
                        'data' => $set
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                $this->internalServerError($e);
            }
        }
    }

    public function completedSets(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $data = $this->set_model->completedSets($request->current_page, $this->sets_per_page, $user->id);
                if(count($data['sets']) == 0){
                    $returnData = [
                        'status' => 0,
                        'msg' => "Không có đủ sets để fill vào trang này",
                        'data' => $data['paginate']
                    ];
                    return response()->json($returnData, 500);
                }
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $data
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                $this->internalServerError($e);
            }
        }
    }

    public function createdSets(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $data = $this->set_model->createdSets($request->current_page, $this->sets_per_page, $user->id);
                if(count($data['sets']) == 0){
                    $returnData = [
                        'status' => 0,
                        'msg' => "Không có đủ sets để fill vào trang này",
                        'data' => $data['paginate']
                    ];
                    return response()->json($returnData, 500);
                }
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $data
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                $this->internalServerError($e);
            }
        }
    }

    public function allSets(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $data = $this->set_model->allSets($request->current_page, $this->sets_per_page, $user->id);
                if(count($data['sets']) == 0){
                    $returnData = [
                        'status' => 0,
                        'msg' => "Không có đủ sets để fill vào trang này",
                        'data' => $data['paginate']
                    ];
                    return response()->json($returnData, 500);
                }
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $data
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                $this->internalServerError($e);
            }
        }
    }

    public function noFolderSets(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $data = $this->set_model->noFolderSets($request->current_page, $this->sets_per_page, $user->id);
                if(count($data['sets']) == 0){
                    $returnData = [
                        'status' => 0,
                        'msg' => "Không có đủ sets để fill vào trang này",
                        'data' => $data['paginate']
                    ];
                    return response()->json($returnData, 500);
                }
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $data
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                $this->internalServerError($e);
            }
        }
    }

    public function search(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $this->sets_per_page = 3;
                return $this->set_model->search($request->current_page, $this->sets_per_page, $request->keyword, $request->price, $request->type);

            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

}
