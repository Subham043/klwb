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
        Schema::create('industry_auths', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('otp')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->string('password');
            $table->foreignId('created_by')->nullable()->index();
            $table->foreignId('reg_industry_id')->nullable()->index();
            $table->boolean('is_blocked')->default(0);
            $table->text('reg_doc')->nullable();
            $table->text('sign')->nullable();
            $table->text('seal')->nullable();
            $table->string('gst_no')->nullable();
            $table->string('pan_no')->nullable();
            $table->string('gst')->nullable();
            $table->string('pan')->nullable();
            $table->foreignId('city_id')->nullable()->index();
            $table->foreignId('taluq_id')->nullable()->index();
            $table->text('address')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('industry_auths');
    }
};
