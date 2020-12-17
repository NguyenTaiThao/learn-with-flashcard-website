<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;

class FolderController extends Controller
{
    public function createFolder(Request $request)
    {
        $token = $request->header();
        $bodyContent = $request->getContent();
        $bodyContent = json_decode($bodyContent, true);


        return [
            "request" => $bodyContent
        ];
    }


    public function addFolder(Request $request)
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
            $folder = new Folder;
            $folder->name = $request->name;
            $folder->description = $request->description;
            $folder->user_id = $user->id;
            $folder->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Create folder successfully'
            ];
        }
    }


    public function editFolder(Request $request)
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
            $folder = Folder::find($request->folder_id);
            $folder->name = $request->name;
            $folder->description = $request->description;
            //$folder->user_id = $user->id;
            $folder->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Edit folder successfully'
            ];
        }
    }

    public function deleteFolder(Request $request)
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
            $folder = Folder::find($request->folder_id);
            $folder->delete();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Delete folder successfully'
            ];
        }
    }
    

}
