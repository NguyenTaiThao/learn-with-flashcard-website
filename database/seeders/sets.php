<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class sets extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sets')->insert([
            ['id'=>1, 'title'=>'title 1', 'price'=>100, 'folder_id'=>1],
            ['id'=>2, 'title'=>'title 2', 'price'=>200, 'folder_id'=>2],
            ['id'=>3, 'title'=>'title 3', 'price'=>300, 'folder_id'=>3],
            ['id'=>4, 'title'=>'title 4', 'price'=>400, 'folder_id'=>6],
            ['id'=>5, 'title'=>'title 5', 'price'=>500, 'folder_id'=>3],
            ['id'=>6, 'title'=>'title 6', 'price'=>600, 'folder_id'=>2],
        ]);
    }
}
