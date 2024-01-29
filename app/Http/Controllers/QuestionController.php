<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $question = new Question;
        $question->description = $request->input('description');
        $question->save();
        $question->outcomes()->attach($request->input('outcomes'));
        return response()->json(["status"=>"success","question"=>$question]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $questionToDelete = Question::find($id);
        if($questionToDelete->outcomes()->detach() && $questionToDelete->delete()){
            return response()->json(["status"=>"success"]);
        }
        else {
            return response()->json(["status"=>"error"]);
        }
    }
}
