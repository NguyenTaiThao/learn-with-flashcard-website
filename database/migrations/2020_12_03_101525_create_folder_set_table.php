<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFolderSetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folder_set', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('set_id');
            $table->foreign('set_id')->references('id')->on('sets')->onDelete('cascade');
            $table->unsignedBigInteger('folder_id');
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
        Schema::dropIfExists('folder_set');
    }
}
