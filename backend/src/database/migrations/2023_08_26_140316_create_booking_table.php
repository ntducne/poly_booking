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
        Schema::connection('mongodb')->create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->date('booking_date');
            $table->date('checkin');
            $table->date('checkout');
            $table->date('pay_date');
            $table->string('representative');
            $table->integer('amount_of_people');
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
        Schema::dropIfExists('booking');
    }
};
