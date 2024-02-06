<?php

namespace App\Http\Controllers;

use App\Models\ClassDepartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ClassDepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $class_deps = ClassDepartment::all();
        return response()->json($class_deps);
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
        $single_class_dep = ClassDepartment::find($id);
        //$students = $single_class_dep->students()->get();
        //$students = ClassDepartment::find($id)->students()->with('answers.question.outcomes')->get();
        $students = $single_class_dep->students()->withCount('answers')->get();
        
        $class = ["class_name"=>$single_class_dep->name, "students"=>$students,];
        return response()->json($class);
    }

    /**
     * Show the form for editing the specified resource.q
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
