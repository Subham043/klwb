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
        Schema::create('application_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->index();
            $table->string('name', 250)->nullable();
            $table->string('branch', 250)->nullable();
            $table->string('ifsc', 250)->nullable();
            $table->string('acc_no', 250)->nullable();
            $table->text('passbook')->nullable();
            $table->text('holder')->nullable();
            $table->tinyInteger('type')->nullable()->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_accounts');
    }
};
