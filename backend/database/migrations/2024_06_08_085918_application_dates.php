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
        Schema::create('application_dates', function (Blueprint $table) {
            $table->id();
            $table->timestamp('from_date', 0)->nullable();
            $table->timestamp('to_date', 0)->nullable();
            $table->timestamp('verification_end_date', 0)->nullable();
            $table->string('application_year')->nullable();
            $table->foreignId('user_id')->nullable()->index();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_dates');
    }
};
