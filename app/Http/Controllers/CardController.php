<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use App\Models\Set;
use App\Models\Card;
use Exception;

class CardController extends Controller
{
    public function addCard(REQUEST $request)
    {
        $token = $request->header();
        $user_model = new User;
        $user = $user_model->isTokenExist($token);
        if ($user == null) {
            return [
                'status' => 0,
                'code' => 403,
                'msg' => 'No token found'
            ];
        }else{
            $card = new Card;
            $card->front_side = $request->front_side;
            $card->back_side = $request->back_side;
            $card->set_id = $request->set_id;
            $card->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Create card successfully'
            ];
        }
    }

    public function editCard(Request $request)
    {
        $token = $request->header();
        $user_model = new User;
        $user = $user_model->isTokenExist($token);
        if ($user == null) {
            return [
                'status' => 0,
                'code' => 403,
                'msg' => 'No token found'
            ];
        }else{
            $card = Card::find($request->card_id);
            $card->front_side = $request->front_side;
            $card->back_side = $request->back_side;
            $card->set_id = $request->set_id;
            $card->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Edit card successfully'
            ];
        }
    }

    public function deleteCard(Request $request)
    {
        $token = $request->header();
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                if($this->card_model->find($request->card_id) == NULL){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'Card does not exist'
                    ];
                    return response()->json($returnData, 400);
                }else{
                    $this->card_model->find($request->card_id)->delete();
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Delete card successfully'
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }
}
