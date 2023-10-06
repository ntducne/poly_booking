<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mongodb')->table('room', function (Blueprint $table) {
            $table->renameColumn('single_room', 'single_bed');
            $table->renameColumn('double_room', 'double_bed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mongodb')->table('room', function (Blueprint $table) {
            $table->renameColumn('single_room', 'single_bed');
            $table->renameColumn('double_room', 'double_bed');
        });
    }
};