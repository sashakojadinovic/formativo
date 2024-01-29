<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class UploadStudentsController extends Controller
{
    private $students = '[
        {
          "class_department_id": 8,
          "first_name": "Ивана",
          "last_name": "Алексић",
          "id_num": "0150420"
        },
        {
          "class_department_id": 8,
          "first_name": "Филип",
          "last_name": "Вучић",
          "id_num": "0350420"
        },
        {
          "class_department_id": 8,
          "first_name": "Алекса",
          "last_name": "Илин",
          "id_num": "0450420"
        },
        {
          "class_department_id": 8,
          "first_name": "Младен",
          "last_name": "Илић",
          "id_num": "0550420"
        },
        {
          "class_department_id": 8,
          "first_name": "Риана",
          "last_name": "Јовановић",
          "id_num": 2570423
        },
        {
          "class_department_id": 8,
          "first_name": "Теодора",
          "last_name": "Јовановић",
          "id_num": "0650420"
        },
        {
          "class_department_id": 8,
          "first_name": "Страхиња",
          "last_name": "Кокотовић",
          "id_num": "0750420"
        },
        {
          "class_department_id": 8,
          "first_name": "Бојан",
          "last_name": "Лазић",
          "id_num": "0850420"
        },
        {
          "class_department_id": 8,
          "first_name": "Јана",
          "last_name": "Марковић",
          "id_num": "0950420"
        },
        {
          "class_department_id": 8,
          "first_name": "Марко",
          "last_name": "Марковић",
          "id_num": 1050420
        },
        {
          "class_department_id": 8,
          "first_name": "Матеја",
          "last_name": "Марковић",
          "id_num": 1150420
        },
        {
          "class_department_id": 8,
          "first_name": "Никола",
          "last_name": "Маслаћ",
          "id_num": 1250420
        },
        {
          "class_department_id": 8,
          "first_name": "Стефан",
          "last_name": "Милошевић",
          "id_num": 1350420
        },
        {
          "class_department_id": 8,
          "first_name": "Анђелка",
          "last_name": "Мирић",
          "id_num": 1450420
        },
        {
          "class_department_id": 8,
          "first_name": "Исидора",
          "last_name": "Мирковић",
          "id_num": 2470423
        },
        {
          "class_department_id": 8,
          "first_name": "Михајло",
          "last_name": "Недељковић",
          "id_num": 1550420
        },
        {
          "class_department_id": 8,
          "first_name": "Андреја",
          "last_name": "Несторовић",
          "id_num": "0850120"
        },
        {
          "class_department_id": 8,
          "first_name": "Милан",
          "last_name": "Николић",
          "id_num": 1650420
        },
        {
          "class_department_id": 8,
          "first_name": "Андрија",
          "last_name": "Поповић",
          "id_num": 1750420
        },
        {
          "class_department_id": 8,
          "first_name": "Анђела",
          "last_name": "Радивојевић",
          "id_num": 1850420
        },
        {
          "class_department_id": 8,
          "first_name": "Ивана",
          "last_name": "Ранђеловић",
          "id_num": 1950420
        },
        {
          "class_department_id": 8,
          "first_name": "Алекса",
          "last_name": "Русалић",
          "id_num": 2050420
        },
        {
          "class_department_id": 8,
          "first_name": "Милош",
          "last_name": "Савић",
          "id_num": 2150420
        },
        {
          "class_department_id": 8,
          "first_name": "Сара",
          "last_name": "Ћирковић",
          "id_num": 2250420
        }
      ]';
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arrayStudents = json_decode($this->students,true);
        foreach($arrayStudents as $s) {
            $student = new Student;
            $student->first_name = $s['first_name'];
            $student->last_name = $s['last_name'];
            $student->id_num=$s['id_num'];
            $student->classDepartment()->associate($s['class_department_id']);
            $student->save();
        }
        return response($arrayStudents[0]['first_name']);
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
    }
}
