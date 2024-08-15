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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('application_year')->nullable();
            $table->foreignId('student_id')->nullable()->index();
            $table->foreignId('school_id')->nullable()->index();
            $table->foreignId('company_id')->nullable()->index();
            $table->tinyInteger('status')->nullable()->default(0);
            $table->tinyInteger('application_state')->nullable()->default(0);
            $table->text('reject_reason')->nullable();
            $table->timestamp('date')->nullable()->default(now());
            $table->tinyInteger('pay_status')->nullable()->default(0);
            $table->text('payf_reason')->nullable();
            $table->date('school_approve')->nullable();
            $table->date('company_approve')->nullable();
            $table->date('govt_approve')->nullable();
            $table->date('admin_approve')->nullable();
            $table->tinyInteger('application_aadhar_status')->nullable()->default(1);
            $table->text('govt_note')->nullable();
            $table->text('admin_note')->nullable();
            $table->tinyInteger('mode_industry')->nullable()->default(1);
            $table->string('reference_industry', 250)->nullable();
            $table->string('dd_industry', 250)->nullable();
            $table->string('amount_industry', 250)->nullable();
            $table->string('date_offline_industry', 250)->nullable();
            $table->tinyInteger('mode_govt')->nullable()->default(1);
            $table->string('reference_govt', 250)->nullable();
            $table->string('dd_govt', 250)->nullable();
            $table->string('amount_govt', 250)->nullable();
            $table->string('date_offline_govt', 250)->nullable();
            $table->text('institute_reject_comment')->nullable();
            $table->text('industry_reject_comment')->nullable();
            $table->foreignId('govt_approve_by')->nullable()->index();
            $table->tinyInteger('resubmitted_status')->nullable()->default(0);
            $table->tinyInteger('hold')->nullable()->default(0);
            $table->tinyInteger('deleted')->nullable()->default(0);
            $table->text('delete_reason')->nullable();
            $table->tinyInteger('inactive')->nullable()->default(0);
            $table->foreignId('application_date_id')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
