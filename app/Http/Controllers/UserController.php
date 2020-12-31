<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Folder;
use App\Models\User;
use App\Models\Set;
use App\Models\Card;
use Exception;
use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|unique:users|email',
            'password' => 'required|min:8',
            're_password' => 'required|min:8',
            'name' => 'required'
        ],
        [
            'email.required' => 'Không được để trống email',
            'email.email' => 'Không đúng định dạng email',
            'email.unique' => 'Email đã được sử dụng',
            'password.required' => 'Không được để trống password',
            're_password.required' => 'Hãy nhập lại mật khẩu',
            'name.required' => 'Không được để trống tên',
            'password.min' => 'Mật khẩu phải dài ít nhất 8 ký tự',
            're_password.min' => 'Mật khẩu nhập lại phải dài ít nhất 8 ký tự'
        ]);
        if($validator->fails()){
            $returnData = array(
                'status' => 0,
                'msg' => $validator->errors()->all()
            );
            return response()->json($returnData, 200);
        }
        try {
            $encrypted_password = bcrypt($request->password);
            $user = new User;
            $user->email = $request->email;
            $user->password = $encrypted_password;
            $user->name = $request->name;
            $user->save();
            $user_id = $user->id;
            $folder = new Folder;
            $folder->name = "Học phần của bạn";
            $folder->description = "Các học phần riêng biệt, không nằm trong thư mục nhất định";
            $folder->user_id = $user_id;
            $folder->save();
            return [
                'status' => 1,
                'code' => 1,
                'msg' => 'Register successfully'
            ];
        }catch(Exception $e){
            return $this->internalServerError($e);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|min:8',
        ],
        [
            'email.required' => 'Không được để trống email',
            'email.requied' => 'Không đúng định dạng email',
            'password.required' => 'Không được để trống password',
            'password.min' => 'Mật khẩu phải dài ít nhất 8 ký tự'
        ]);
        if($validator->fails()){
            $returnData = array(
                'status' => 0,
                'msg' => $validator->errors()->all()
            );
            return response()->json($returnData, 200);
        }
        try {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $remember_token = Hash::make(Str::random() . time());
                $user = User::where('email', $request->email)->first();
                $user->remember_token = $remember_token;
                $user->save();
                $returnData = [
                    'status' => 1,
                    'msg' => 'Login successfully',
                    'data' => $user
                ];
                return response()->json($returnData, 200);
            } else {
                $returnData = [
                    'status' => 0,
                    'msg' => 'Email or password is incorrect'
                ];
                return response()->json($returnData, 200);
            }
        }catch(Exception $e){
            return $this->internalServerError($e);
        }
    }


    // đăng xuất
    public function logout(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else{
            try {
                //logout user you want to, by id
                $userToLogout = User::find($user->id);
                Auth::setUser($userToLogout);
                $userToLogout->remember_token = "";
                $userToLogout->save();
                Auth::logout();
                //set again current user
                //Auth::setUser($user);
                $returnData = [
                    'status' => 1,
                    'msg' => 'Logout successfully'
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }


    public function recentSets(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {
                $sets = $this->set_model->recentSets($user->id);
                $returnData = [
                    'status' => 1,
                    'msg' => 'Get User\'s Info Successfully',
                    'data' => $sets
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function listSetsByTime(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {
                $sets = $this->set_model->listSetsByTime($user->id);
                $returnData = [
                    'status' => 1,
                    'msg' => 'Get Sets from time by time',
                    'data' => $sets
                ];
                return response()->json($returnData, 200);
            }catch(Exception $e){
                return $this->internalServerError($e);
            }
        }
    }

    public function userInfo(Request $request)
    {
        $token = $request->header("token");
        try{
            $user = $this->user_model->isTokenExist($token);
            if ($user == null) {
                return $this->tokenNotExist();
            } else {
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $user
                ];
                return response()->json($returnData, 200);
            }
        }catch(Exception $e){
            return $this->internalServerError($e);
        }
    }

}
