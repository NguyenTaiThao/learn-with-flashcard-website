<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class cards extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cards')->insert([
            ['id'=>1, 'front_side'=>'front_side 1', 'back_side'=>'back_side 1', 'set_id'=>1],
            ['id'=>2, 'front_side'=>'front_side 2', 'back_side'=>'back_side 2', 'set_id'=>2],
            ['id'=>3, 'front_side'=>'front_side 3', 'back_side'=>'back_side 3', 'set_id'=>3],
            ['id'=>4, 'front_side'=>'front_side 4', 'back_side'=>'back_side 4', 'set_id'=>4],
            ['id'=>5, 'front_side'=>'front_side 5', 'back_side'=>'back_side 5', 'set_id'=>2],
            ['id'=>6, 'front_side'=>'front_side 6', 'back_side'=>'back_side 6', 'set_id'=>1],
            ['id'=>7, 'front_side'=>'front_side 7', 'back_side'=>'back_side 7', 'set_id'=>1],
            ['id'=>8, 'front_side'=>'front_side 8', 'back_side'=>'back_side 8', 'set_id'=>1],
            ['id'=>9, 'front_side'=>'front_side 9', 'back_side'=>'back_side 9', 'set_id'=>1],
            ['id'=>10, 'front_side'=>'front_side 10', 'back_side'=>'back_side 10', 'set_id'=>1],
            ['id'=>11, 'front_side'=>'front_side 11', 'back_side'=>'back_side 11', 'set_id'=>1],
            ['id'=>12, 'front_side'=>'front_side 12', 'back_side'=>'back_side 12', 'set_id'=>1],
        ]);
    }
}
