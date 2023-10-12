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
        Schema::connection('mongodb')->create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });
        Schema::connection('mongodb')->create('admin_has_permission', function (Blueprint $table) {
            $table->id();
            $table->string('id_admin');
            $table->string('id_permission');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
};
