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
        Schema::create('combo_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image');
            $table->double('original_price', 10, 2)->default(0);
            $table->double('discounted_price', 10, 2)->default(0);
            $table->double('flat_discount', 10, 2)->default(0);
            $table->longText('images')->nullable();
            $table->longText('description')->nullable();
            $table->boolean('is_optional')->default(0);
            $table->boolean('is_combo')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combo_products');
    }
};
