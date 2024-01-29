<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
   private $first_names = ["Stanko", "Milena", "Janko", "Svetislav", "Ana", "Rajko", "Stevica", "Magda", "Slavica", "Milica", "Jovan", "Monika", "Milan"];
   private $last_names = ["Stanković", "Milenković", "Janković", "Stevanović", "Antić", "Rajković", "Stević", "Marinković", "Tošić", "Radić", "Radenković"];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::create([
            'first_name' => $this->first_names[array_rand($this->first_names,1)],
            'last_name' => $this->last_names[array_rand($this->last_names,1)],
            'class_department_id' => 2

        ]);
    }
}
