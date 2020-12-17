<?php

use App\Models\Folder;
use App\Models\User;
use Illuminate\Database\Schema\Grammars\RenameColumn;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
   $folders = Folder::all();
   foreach($folders as $folder){
    //    foreach($user->folders as $folder){
    //        echo $user->name." has ".$folder->name."<br>";
    //    }
    echo $folder->user->name;
       echo "<hr>";
   } 
});



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

