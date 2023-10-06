<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mongodb')->create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_type_id');
            $table->string('area');
            $table->integer('num_of_people');
            $table->string('description');
            $table->string('discount');
            $table->tinyInteger('status',0);
            $table->string('policies_and_information');
            $table->integer('num_of_bed');
            $table->integer('bed_size');
            $table->string('branch_id');
            $table->string('room_name');
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
        Schema::dropIfExists('rooms');
    }
};
