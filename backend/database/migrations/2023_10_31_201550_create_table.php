<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection('mongodb')->create('admins', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('admin_has_permissions', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('billings', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('book_details', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('bookings', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('branches', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('cancellation_policy', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('history_handle', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('password_resets', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('permissions', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('promotions', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('rate_rooms', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('room_images', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('room_types', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('rooms', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('services', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('users', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('utilities', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('utilities_rooms', function (Blueprint $table) {});
        Schema::connection('mongodb')->create('verify_email', function (Blueprint $table) {});
    }

    public function down(): void
    {
        // Schema::dropIfExists('table');
        Schema::connection('mongodb')->dropIfExists('admins');
        Schema::connection('mongodb')->dropIfExists('admin_has_permissions');
        Schema::connection('mongodb')->dropIfExists('billings');
        Schema::connection('mongodb')->dropIfExists('book_details');
        Schema::connection('mongodb')->dropIfExists('bookings');
        Schema::connection('mongodb')->dropIfExists('branches');
        Schema::connection('mongodb')->dropIfExists('cancellation_policy');
        Schema::connection('mongodb')->dropIfExists('history_handles');
        Schema::connection('mongodb')->dropIfExists('password_resets');
        Schema::connection('mongodb')->dropIfExists('permissions');
        Schema::connection('mongodb')->dropIfExists('promotions');
        Schema::connection('mongodb')->dropIfExists('rates');
        Schema::connection('mongodb')->dropIfExists('room_images');
        Schema::connection('mongodb')->dropIfExists('room_types');
        Schema::connection('mongodb')->dropIfExists('rooms');
        Schema::connection('mongodb')->dropIfExists('services');
        Schema::connection('mongodb')->dropIfExists('rates');
        Schema::connection('mongodb')->dropIfExists('utilities_rooms');
        Schema::connection('mongodb')->dropIfExists('verify_email');


    }
};
