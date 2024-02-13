<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Theme;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
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
        $subject = new Subject;
        if ($request->input('subjectTitle')) {
            $subject->title = $request->input('subjectTitle');
            $subject->save();
            return response()->json(["status" => "success", "last" => $subject]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subject = Subject::find($id);

        /*         $themes = Theme::select('id', 'title')->with([
                    'units' => function ($query) {
                        $query->select('id', 'title', 'theme_id')
                            ->with([
                                'questions' => function ($query) {
                                    $query->select('id', 'title', 'description', 'unit_id');
                                }
                            ]);
                    }
                ])->get(); */
        $themes = Theme::select('id', 'title')->with([
            "units" => function ($query) {
                $query->select('id', 'title', 'theme_id')
                    ->with([
                        "outcomes" => function ($query) {
                            $query->select('id', 'description');
                        }
                    ]);
            }
        ])->get();
        return response()->json(["themes" => $subject->themes()->get()]);

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
