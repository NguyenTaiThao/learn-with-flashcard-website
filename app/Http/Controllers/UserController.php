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
use App\Models\Bill;
use App\Models\BillDetail;
use App\Notifications\ConfirmBill;
use Exception;
use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\Hash;
use Importer;
use Symfony\Component\Routing\Loader\Configurator\ImportConfigurator;

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

    public function buy(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {
                $cart = $request->cart;
                //create bill
                $bill = new Bill;
                $bill->user_id = $user->id;
                $bill->total_price = $request->total_price;
                $bill->save();
                $bill_id = $bill->id;
                foreach ($cart as $key => $set_id) {
                    $set = $this->set_model->find($set_id);
                    $this->user_model->find($set->folder->user->id)->notify(new ConfirmBill("Set ". $set->title . " vừa được mua bởi ". $user->name. "\. Số dư + ".$set->price));
                    //create bill's detail
                    $bill_detail = new BillDetail;
                    $bill_detail->bill_id = $bill_id;
                    $bill_detail->set_id = $set_id;
                    $bill_detail->quantum = 1;
                    $bill_detail->price = $set->price;
                    $bill_detail->save();
                    //$set->bought_times = $set->bought_times + 1;
                    $new_set = $set->replicate();
                    $new_set->folder_id = $this->folder_model->minFolderID($user->id);
                    $new_set->is_purchased = 1;
                    $new_set->price = -1;
                    $new_set->save();
                    $new_set_id = $new_set->id;
                    foreach ($set->cards as $card) {
                        $new_card = $card->replicate();
                        $new_card->set_id = $new_set_id;
                        $new_card->remember = 0;
                        $new_card->save();
                    }
                }
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công"
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                return $this->internalServerError($e);
            }
        }
    }

    public function getNoti(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {
                $data = $this->user_model->getNoti($user->id);
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công",
                    'data' => $data
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                return $this->internalServerError($e);
            }
        }
    }

    public function markAsRead(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {
                $this->user_model->markAsRead($user->id);
                $returnData = [
                    'status' => 1,
                    'msg' => "Thành công"
                ];
                return response()->json($returnData, 200);
            } catch (Exception $e) {
                return $this->internalServerError($e);
            }
        }
    }

    public function importExcel(Request $request)
    {
        $token = $request->header("token");
        $user = $this->user_model->isTokenExist($token);
        if ($user == null) {
            return $this->tokenNotExist();
        }else {
            try {

                $validator = Validator::make($request->all(), [
                    'file' => 'required|max:100000|mimes:xlsx,xls,csv'
                ], [
                    'file.required' => "Chưa nhập file",
                    'file.max' => "Quá dung lượng cho phép",
                    'file.mimes' => "Chỉ chấp nhận file xlsx, xls hoặc csv"
                ]);
                if ($validator->fails()) {
                    $returnData = array(
                        'status' => 0,
                        'msg' => $validator->errors()->all()
                    );
                    return response()->json($returnData, 200);
                }
                //handle file
                $time = date('Ymd_His');
                $file = $request->file('file');
                $file_name = $time . '-' . $file->getClientOriginalName();
                $save_path = public_path('/upload/');
                $file->move($save_path, $file_name);
                //excel
                $excel = Importer::make('Excel');
                $excel->load($save_path.$file_name);
                $collection = $excel->getCollection();
                if(sizeof($collection[1]) == 2){
                    $set = new Set;
                    $set->title = $request->title;
                    $set->price = $request->price;
                    $set->folder_id = $this->folder_model->minFolderID($user->id);
                    $set->number_of_cards = sizeof($collection);
                    $set->save();
                    $set_id = $set->id;
                    for($row=0; $row<sizeof($collection); $row++){
                        try{
                            $card = new Card;
                            $card->front_side = $collection[$row][0];
                            $card->back_side = $collection[$row][1];
                            $card->remember = 0;
                            $card->set_id = $set_id;
                            $card->save();
                        }catch(Exception $e)
                        {
                            return $this->internalServerError($e);
                        }
                    }
                    $returnData = [
                        'status' => 1,
                        'msg' => "Thành công"
                    ];
                    return response()->json($returnData, 200);
                }else{
                    $returnData = array(
                        'status' => 0,
                        'msg' => 'File phải được định dạng đúng với file mẫu'
                    );
                    return response()->json($returnData, 200);
                }
            } catch (Exception $e) {
                return $this->internalServerError($e);
            }
        }

    }

}
