<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sets', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->unsignedDouble('price')->default(-1);
            $table->unsignedBigInteger('folder_id');
            $table->unsignedInteger('number_of_cards')->default(0);
            $table->unsignedInteger('completed')->default(0);
            $table->unsignedTinyInteger('is_purchased')->default(0);
            $table->unsignedInteger('bought_times')->default(0);
            $table->foreign('folder_id')->references('id')->on('folders')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sets');
    }
}
