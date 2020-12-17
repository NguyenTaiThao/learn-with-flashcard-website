<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use App\Models\Set;

class SetController extends Controller
{
    public function addSet(REQUEST $request)
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
        $user_model = new User;
        $user = $user_model->isTokenExist($token);
        if ($user == null) {
            return [
                'status' => 0,
                'code' => 403,
                'msg' => 'No token found'
            ];
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
        $user_model = new User;
        $user = $user_model->isTokenExist($token);
        if ($user == null) {
            return [
                'status' => 0,
                'code' => 403,
                'msg' => 'No token found'
            ];
        }else{
            $set = Set::find($request->set_id);
            $set->delete();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Delete folder successfully'
            ];
        }
    }
}
