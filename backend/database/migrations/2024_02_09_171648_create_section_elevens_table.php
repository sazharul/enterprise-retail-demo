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
        Schema::create('section_elevens', function (Blueprint $table) {
            $table->id();
            $table->integer('section_id')->default(11);
            $table->string('name')->nullable();
            $table->text('image')->nullable();
            $table->text('link')->nullable();
            $table->string('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_elevens');
    }
};
