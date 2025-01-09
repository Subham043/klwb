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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comp_regd_id')->nullable()->index();
            $table->string('year')->nullable();
            $table->string('pay_id', 250)->nullable();
            $table->string('price', 250)->nullable();
            $table->timestamp('payed_on')->nullable()->default(now());
            $table->string('male', 250)->nullable();
            $table->string('female', 250)->nullable();
            $table->string('interest', 250)->nullable();
            $table->tinyInteger('status')->nullable()->default(0);
            $table->tinyInteger('resolved')->nullable()->default(0);
            $table->string('transaction_status', 250)->nullable();
            $table->string('atrn', 250)->nullable();
            $table->string('interest_paid', 250)->nullable()->default('0');
            $table->text('employee_excel')->nullable();
            $table->boolean('is_edited')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
