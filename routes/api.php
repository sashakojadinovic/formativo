<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ClassDepartmentController;
use App\Http\Controllers\OutcomeController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UploadStudentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('/student', StudentController::class);
Route::resource('/class_dep', ClassDepartmentController::class);
Route::resource('/subject', SubjectController::class);
Route::resource('/theme', ThemeController::class);
Route::resource('/unit', UnitController::class);
Route::resource('/answer',AnswerController::class);
Route::resource('/outcome',OutcomeController::class);
Route::resource('/question',QuestionController::class);
//
Route::resource('/upload_students',UploadStudentsController::class);