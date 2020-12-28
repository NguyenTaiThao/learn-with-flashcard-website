<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class folders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('folders')->insert([
            ['id'=>1, 'name'=>'Học phần của bạn', 'description'=>'Các học phần riêng biệt, không nằm trong thư mục nhất định', 'user_id'=>1],
            ['id'=>2, 'name'=>'Học phần của bạn', 'description'=>'Các học phần riêng biệt, không nằm trong thư mục nhất định', 'user_id'=>2],
            ['id'=>3, 'name'=>'Học phần của bạn', 'description'=>'Các học phần riêng biệt, không nằm trong thư mục nhất định', 'user_id'=>3],
            ['id'=>4, 'name'=>'folder 1', 'description'=>'des 1', 'user_id'=>3],
            ['id'=>5, 'name'=>'folder 2', 'description'=>'des 2', 'user_id'=>2],
            ['id'=>6, 'name'=>'folder 3', 'description'=>'des 3', 'user_id'=>1],
        ]);
    }
}
