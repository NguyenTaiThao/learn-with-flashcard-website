<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class GetWeatherController extends Controller
{
    protected $api_key = "87f911934711a3270f0e2768793d7c35";


    function getWeather1()
    {
        $url = "http://api.ipstack.com/210.86.228.180?access_key=bae41731f0d012e8b97e42d59cac770e";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response = json_decode($response);
        $latitude  = $response->latitude;
        $longitude  = $response->longitude;
        dd($response);
    }




    public function getWeather()
    {
        try{
            //API lấy tọa độ qua IP
            $url = "http://api.ipstack.com/103.88.112.136?access_key=bae41731f0d012e8b97e42d59cac770e";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            $response = curl_exec($ch);
            curl_close($ch);
            $response = json_decode($response);
            $latitude  = $response->latitude;
            $longitude  = $response->longitude;


            //API lấy thời tiết qua tọa độ
            date_default_timezone_set("Asia/Ho_Chi_Minh");
            $google_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" . $latitude . "&lon=" . $longitude ."&lang=vi&units=metric&APPID=" . $this->api_key;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $google_api_url);
            curl_setopt($ch, CURLOPT_VERBOSE, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            $response = curl_exec($ch);
            curl_close($ch);
            $data = json_decode($response);
            $current_time = time();
            $weather_info = [
                'city_name' => $data->name,
                'current_time' => date("F j, Y, g:i a", $current_time),
                'description' => ucwords($data->weather[0]->description),
                'icon' => "http://openweathermap.org/img/w/" . $data->weather[0]->icon . ".png",
                'temp' => $data->main->temp,
                'temp_max' => $data->main->temp_max,
                'temp_min' => $data->main->temp_min,
                'humidity(%)' => $data->main->humidity,
                'wind(km/h)' => $data->wind->speed,
            ];
            $returnData = [
                'status' => 1,
                'msg' => 'Get weather information successfully',
                'data' => $weather_info
            ];
            return response()->json($returnData, 200);
        }catch(Exception $e){
            return $this->internalServerError($e);
        }
    }
}
