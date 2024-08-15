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
        Schema::create('application_basic_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->index();
            $table->string('name', 250)->nullable();
            $table->string('father_name', 250)->nullable();
            $table->string('mother_name', 250)->nullable();
            $table->text('address')->nullable();
            $table->string('parent_phone', 250)->nullable();
            $table->boolean('is_scst')->default(1);
            $table->string('category', 250)->nullable();
            $table->text('cast_certificate')->nullable();
            $table->string('cast_no', 250)->nullable();
            $table->string('adharcard_no', 250)->nullable();
            $table->text('adharcard_file')->nullable();
            $table->string('gender', 250)->nullable();
            $table->string('f_adhar', 250)->nullable();
            $table->text('f_adharfile')->nullable();
            $table->string('m_adhar', 250)->nullable();
            $table->text('m_adharfile')->nullable();
            $table->string('not_applicable', 250)->nullable();
            $table->text('deathcertificate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_basic_details');
    }
};
