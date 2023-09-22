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
<<<<<<< HEAD
        // Schema::create('branches', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });
=======
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('name');
            $table->string('number');
            $table->timestamps();
        });
>>>>>>> 17341beb6f41f490149bad63bcd7feaf5a738232
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('branches');
    }
};
