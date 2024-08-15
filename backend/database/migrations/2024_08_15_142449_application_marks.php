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
        Schema::create('application_marks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->index();
            $table->foreignId('graduation_id')->nullable()->index();
            $table->foreignId('course_id')->nullable()->index();
            $table->foreignId('class_id')->nullable()->index();
            $table->string('ins_pin', 250)->nullable();
            $table->foreignId('ins_district_id')->nullable()->index();
            $table->foreignId('ins_taluq_id')->nullable()->index();
            $table->string('prv_class', 250)->nullable();
            $table->string('prv_marks', 250)->nullable();
            $table->text('prv_markcard')->nullable();
            $table->text('prv_markcard2')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_marks');
    }
};
