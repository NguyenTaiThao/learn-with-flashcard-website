<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_detail', function (Blueprint $table) {
            $table->id();
            $table->integer('quantum')->unsigned();
            $table->double('price');

            $table->unsignedBigInteger('card_id');
            $table->foreign('card_id')->references('id')->on('cards')->onDelete('cascade');
            $table->unsignedBigInteger('bill_id');
            $table->foreign('bill_id')->references('id')->on('bills')->onDelete('cascade');

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
        Schema::dropIfExists('bill_detail');
    }
}
