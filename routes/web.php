<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
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

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

Route::get('/test', [FolderController::class, 'test']);

Route::group(['prefix' => 'folder'], function () {
    Route::post('/add', [FolderController::class, 'addFolder']);
    Route::post('/edit/{id}', [FolderController::class, 'editFolder']);
    Route::get('/delete/{id}', [FolderController::class, 'deleteFolder']);
});

Route::group(['prefix' => 'set'], function () {
    Route::post('/add', [SetController::class, 'addSet']);
    Route::post('/edit/{id}', [SetController::class, 'editSet']);
    Route::post('/delete/{id}', [SetController::class, 'deleteSet']);
});

Route::group(['prefix' => 'card'], function () {
    Route::post('/add', [CardController::class, 'addCard']);
    Route::post('/edit/{id}', [CardController::class, 'editCard']);
    Route::post('/delete/{id}', [CardController::class, 'deleteCard']);
});


