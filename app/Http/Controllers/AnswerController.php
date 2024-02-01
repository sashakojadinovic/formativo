<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
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
        $student_id = $request->input('studentId');
        $question_id = $request->input('questionId');
        $assessment_id = $request->input('assessmentId');
        $answer = new Answer;
        $answer->student()->associate($student_id);
        $answer->question()->associate($question_id);
        $answer->assessment()->associate($assessment_id);
        if($request->input('comment')!=="") {
            $answer->comment =$request->input('comment');
        }
        $answer->save();
        $res = ["response_type"=>"json", "response_value"=>"Success"];
        //return response()->json($res);
        //return response()->json($arr[0]);
        return response()->json(["status"=>"success"]);
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
        //
        $answerToDelete = Answer::find($id);
        if($answerToDelete->delete()) {
            return response()->json(["status"=>"success"]);
        }
        else {
            return response()->json(["status"=>"error"]);
        }
       
        

    }
}
