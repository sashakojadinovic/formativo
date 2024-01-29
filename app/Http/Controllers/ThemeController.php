<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;

class ThemeController extends Controller
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
        /* 
                $questions = Theme::select('id', 'title')->with(["units" => function($query){
                    $query->select('id','theme_id','title')->with(["questions"=>function($query){
                        $query->select('id','unit_id','title','description')->with(["outcomes"=>function($query){
                            $query->select('description');
                        }]);
                    }]);
                }])->where('id',$id)->first(); */
        $questions = Theme::select('id', 'title')->with([
            "units" => function ($query) {
                $query->select('id', 'theme_id', 'title')->with([
                    "outcomes" => function ($query) {
                        $query->select('id', 'unit_id','order_number', 'description')->orderBy('order_number')->with(["questions"=>function($query){
                            $query->select('description');
                        }]);
                    }
                ]);
            }
        ])->where('id', $id)->first();
        return response()->json($questions);
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
