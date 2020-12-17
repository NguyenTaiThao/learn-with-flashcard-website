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
            ['id'=>1, 'name'=>'trung', 'email'=>'trung@gmail.com', 'password' => '123456', 'remember_token'=>'123456'],
            ['id'=>2, 'name'=>'dung', 'email'=>'dung@gmail.com', 'password' => '123456', 'remember_token'=>'123456'],
            ['id'=>3, 'name'=>'thao', 'email'=>'thao@gmail.com', 'password' => '123456', 'remember_token'=>'123456'],
        ]);
    }
}
