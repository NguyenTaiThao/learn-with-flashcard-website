<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['id'=>1, 'name'=>'trung', 'email'=>'trung@gmail.com', 'password' => '$2y$10$21G3cGDN5J8idP5gKIb52eV8Kywbe6XNSehVkehcpARFH7r98kE8q', 'remember_token'=>''],
            ['id'=>2, 'name'=>'dung', 'email'=>'dung@gmail.com', 'password' => '$2y$10$21G3cGDN5J8idP5gKIb52eV8Kywbe6XNSehVkehcpARFH7r98kE8q', 'remember_token'=>''],
            ['id'=>3, 'name'=>'thao', 'email'=>'thao@gmail.com', 'password' => '$2y$10$21G3cGDN5J8idP5gKIb52eV8Kywbe6XNSehVkehcpARFH7r98kE8q', 'remember_token'=>''],
        ]);
    }
}
