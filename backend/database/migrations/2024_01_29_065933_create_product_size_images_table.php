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
        Schema::create('product_size_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_size_id')->nullable()->constrained('product_sizes');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('size_id')->nullable()->constrained('sizes');
            $table->string('product_size_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_size_images');
    }
};
