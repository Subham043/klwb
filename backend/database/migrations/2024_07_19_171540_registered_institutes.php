<?php

use App\Modules\InstituteManagement\RegisteredInstitutes\Enums\UrbanRural;
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
        Schema::create('registered_institutes', function (Blueprint $table) {
            $table->id();
            $table->string('reg_no')->nullable();
            $table->text('name');
            $table->string('management_type');
            $table->string('category');
            $table->string('type');
            $table->string('urban_rural')->default(UrbanRural::RURAL);
            $table->foreignId('taluq_id')->nullable()->index();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registered_institutes');
    }
};
