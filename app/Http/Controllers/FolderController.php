<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function test(Request $request){
        $token = $request->header();
        $bodyContent = $request->getContent();
        $bodyContent = json_decode($bodyContent, true);


        return [
            "request" => $bodyContent
        ];
    }
}
