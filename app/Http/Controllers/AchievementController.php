<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
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
        $outcome_id = $request->input('outcomeId');
        $assessment_id = $request->input('assessmentId');
        $Achievement = new Achievement;
        $Achievement->student()->associate($student_id);
        $Achievement->outcome()->associate($outcome_id);
        $Achievement->assessment()->associate($assessment_id);
        if($request->input('comment')!=="") {
            $Achievement->comment =$request->input('comment');
        }
        if($request->input('recommendation')!=="") {
            $Achievement->recommendation =$request->input('recommendation');
        }
        $Achievement->save();
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
        $AchievementToDelete = Achievement::find($id);
        if($AchievementToDelete->delete()) {
            return response()->json(["status"=>"success"]);
        }
        else {
            return response()->json(["status"=>"error"]);
        }
       
        

    }
}
