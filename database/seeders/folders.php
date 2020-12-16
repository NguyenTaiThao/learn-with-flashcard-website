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
            ['id'=>1, 'name'=>'folder 1', 'description'=>'description 1', 'user_id'=>1],
            ['id'=>2, 'name'=>'folder 2', 'description'=>'description 2', 'user_id'=>2],
            ['id'=>3, 'name'=>'folder 3', 'description'=>'description 3', 'user_id'=>3],
            ['id'=>4, 'name'=>'folder 4', 'description'=>'description 4', 'user_id'=>3],
            ['id'=>5, 'name'=>'folder 5', 'description'=>'description 5', 'user_id'=>2],
            ['id'=>6, 'name'=>'folder 6', 'description'=>'description 6', 'user_id'=>1],
        ]);
    }
}
