<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\UserController;
use App\Models\Folder;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

Route::get('/test', [FolderController::class, 'test']);

Route::group(['prefix' => 'user'], function(){
    Route::get('/info', [UserController::class, 'userInfo']);
});

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

Route::get('/recentSets', [UserController::class, 'recentSets']);
Route::post('/createOrUpdateSet', [SetController::class, 'createOrUpdateSet']);
Route::post('/setToFolder', [SetController::class, 'setToFolder']);
Route::get('/listFolders', [FolderController::class, 'listFolders']);
Route::post('/createOrUpdateFolder', [SetController::class, 'createOrUpdateFolder']);

