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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('reg_no')->nullable();
            $table->string('principal')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('reg_certification')->nullable();
            $table->text('principal_signature')->nullable();
            $table->text('seal')->nullable();
            $table->foreignId('reg_institute_id')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
