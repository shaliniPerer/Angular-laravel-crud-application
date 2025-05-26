<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\studentController;

Route::post('/login', [studentController::class, 'login']);


Route::apiResource('/students', studentController::class);
