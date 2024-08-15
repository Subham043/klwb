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
        Schema::create('application_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->index();
            $table->tinyInteger('who_working')->nullable()->default(1);
            $table->string('name', 250)->nullable();
            $table->string('relationship', 250)->nullable();
            $table->string('msalary', 250)->nullable();
            $table->string('pincode', 250)->nullable();
            $table->foreignId('district_id')->nullable()->index();
            $table->foreignId('taluq_id')->nullable()->index();
            $table->text('employeeID')->nullable();
            $table->text('salaryslip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_companies');
    }
};
