<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;


class StudentController extends Controller
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
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$student = Student::find($id)->with('classDepartment')->where('id',$id)->first();
        $student = Student::with('classDepartment')->find($id);
        $answers = Student::find($id)->answers()->with('question.outcomes.unit.theme')->get();
        $formattedAnswers = $answers->map(function ($answer) {
            $answer->date = $answer->created_at->format('d.m.Y.');
        });
        return response()->json(["student"=>$student, "answers"=>$answers]);
        //return response()->json(["student" => $student, "answers" => $formattedAnswers]);
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
    }
}
