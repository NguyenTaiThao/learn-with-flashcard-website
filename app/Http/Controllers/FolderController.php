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

    protected $folders_per_page = 3;
    protected $current_page = 1;

    public function test(Request $request)
    {
        $token = $request->header();
        $bodyContent = $request->getContent();
        $bodyContent = json_decode($bodyContent, true);
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
            try{
                if($this->folder_model->find($request->folder_id) == NULL){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'Folder does not exist'
                    ];
                    return response()->json($returnData, 400);
                }else{
                    $this->folder_model->find($request->folder_id)->delete();
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Delete folder successfully'
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function listFolders(Request $request)
    {
        $token = $request->header('token');
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try{
                if($request->current_page == NULL){
                    $this->current_page = 1;
                }else{
                    $this->current_page = $request->current_page;
                }
                $defaul_folder = $this->folder_model->minFolderID($user->id);
                $data = $user->listFolders($this->current_page, $this->folders_per_page, $defaul_folder);
                if(count($data['folders']) == 0){
                    $returnData = [
                        'status' => 0,
                        'msg' => "Không có đủ folders để fill vào trang này",
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
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function createOrUpdateFolder(Request $request)
    {
        $token = $request->header('token');
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try{
                if($request->id == 0){ //trường hợp tạo mới folder
                    $folder = new Folder;
                    $folder->user_id = $user->id;
                }else{ //trường hợp update folder
                    $folder = Folder::find($request->id);
                }
                $folder->name = $request->name;
                $folder->description = $request->description;
                $folder->save();
                $returnData = [
                    'status' => 1,
                    'msg' => $request->id == 0 ? 'Create folder successfully' : 'Update folder successfully'
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function folderDetail(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try{
                $folder = $this->folder_model->folderDetail($request->id);
                if($folder == NULL){
                    $returnData = [
                        'status' => 0,
                        'msg' => 'Folder does not exist!',
                    ];
                    return response()->json($returnData, 200);
                }else{
                    $returnData = [
                        'status' => 1,
                        'msg' => 'Get Folder\'s detail successfully!',
                        'data' => $folder
                    ];
                    return response()->json($returnData, 200);
                }
            }catch(Exception $e){
                $this->internalServerError($e);
            }
        }
    }
}
