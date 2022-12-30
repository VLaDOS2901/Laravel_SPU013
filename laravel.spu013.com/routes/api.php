<?php

use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Маршрут до контроллера та його класу
Route::get('/products', [ProductController::class, 'index']);
Route::delete('/delete/{id}', [ProductController::class, 'delete']);
Route::post('/post/{n}/{d}', [ProductController::class, 'post']);
