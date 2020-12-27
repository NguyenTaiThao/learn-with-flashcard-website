<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Folder;
use App\Models\Set;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Exception;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //model
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

    public function tokenNotExist()
    {
        $returnData = [
            'status' => 0,
            'msg' => 'No token found'
        ];
        return response()->json($returnData, 403);
    }

    public function internalServerError(Exception $e)
    {
        $returnData = [
            'status' => 0,
            'msg' => 'Something went wrong',
            'error' => $e
        ];
        return response()->json($returnData, 500);
    }
}
