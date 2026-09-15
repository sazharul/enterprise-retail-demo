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
        Schema::create('product_review_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_review_id')->nullable()->constrained('product_reviews');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('shade_id')->nullable()->constrained('shades');
            $table->foreignId('size_id')->nullable()->constrained('sizes');
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_review_images');
    }
};
