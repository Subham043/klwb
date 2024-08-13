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
        Schema::create('registered_industries', function (Blueprint $table) {
            $table->id();
            $table->string('reg_id')->nullable();
            $table->text('name');
            $table->tinyInteger('act')->nullable();
            $table->foreignId('state_id')->nullable()->index();
            $table->foreignId('city_id')->nullable()->index();
            $table->foreignId('taluq_id')->nullable()->index();
            $table->string('pincode')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registered_industries');
    }
};
