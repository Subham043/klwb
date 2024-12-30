<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('request_industries', function (Blueprint $table) {
            $table->id();
            $table->text('company')->nullable();
            $table->string('email')->nullable();
            $table->string('mobile')->nullable();
            $table->string('gst_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->tinyInteger('act')->nullable();
            $table->text('address')->nullable();
            $table->text('register_doc')->nullable();
            $table->foreignId('city_id')->nullable()->index();
            $table->foreignId('taluq_id')->nullable()->index();
            $table->tinyInteger('status')->default(0);
            $table->text('reject_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_industries');
    }
};
