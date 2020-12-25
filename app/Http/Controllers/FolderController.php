<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Set;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use Exception;
use Symfony\Component\CssSelector\Exception\InternalErrorException;

class FolderController extends Controller
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
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                $folder = new Folder;
                $folder->name = $request->name;
                $folder->description = $request->description;
                $folder->user_id = $user->id;
                $folder->save();
                $returnData = [
                    'status' => 1,
                    'msg' => 'Create folder successfully'
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->InternalErrorException($e);
            }
        }
    }


    public function editFolder(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
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
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
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

    public function listFolders(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            $data = $user->folders()->orderBy('updated_at', 'DESC')->with('sets')->get();
            return $data;
        }
    }

    public function createOrUpdateFolder(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{

        }
    }
}
