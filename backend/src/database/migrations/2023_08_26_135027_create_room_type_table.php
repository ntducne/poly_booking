<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::connection('mongodb')->create('room_type', function (Blueprint $table) {
            $table->id();
            $table->string('room_type_name');
            $table->string('description');
            $table->float('price_per_night',10,2);
            $table->string('status');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('room_type');
    }
};
