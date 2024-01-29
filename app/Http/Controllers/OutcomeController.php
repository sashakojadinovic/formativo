<?php

namespace App\Http\Controllers;

use App\Models\Outcome;
use Illuminate\Http\Request;

class OutcomeController extends Controller
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
        $outcome = new Outcome;
        $outcome->description = $request->input('description');
        $outcome->unit()->associate($request->input('unit_id'));
        $outcome->save();

        return response()->json(["status"=>"success", "outcome"=>$outcome]);
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
        $outcomeToDelete = Outcome::find($id);
        if($outcomeToDelete->questions()->detach() && $outcomeToDelete->delete()){
            return response()->json(["status"=>"success"]);
        }
        else {
            return response()->json(["status"=>"error"]);
        }
    }
}
