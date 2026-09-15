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
        Schema::create('section_sevens', function (Blueprint $table) {
            $table->id();
            $table->integer('section_id')->default(7);
            $table->string('name')->nullable();
            $table->text('image')->nullable();
            $table->string('description')->nullable();
            $table->foreignId('offer_id')->nullable()->constrained('offers');
            $table->string('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_sevens');
    }
};
