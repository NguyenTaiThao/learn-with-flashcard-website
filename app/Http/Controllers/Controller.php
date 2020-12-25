<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Exception;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
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
