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
        Schema::create('product_shade_images', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('shade_id')->nullable()->constrained('shades');
            // $table->foreignId('product_id')->nullable()->constrained('products');
            // $table->foreignId('product_image_id')->nullable()->constrained('product_images');
            // $table->double('shade_price', 10,2)->default(0);
            // $table->string('shade_image')->nullable();

            $table->foreignId('product_shade_id')->nullable()->constrained('product_shades');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('shade_id')->nullable()->constrained('shades');
            $table->string('product_shade_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_shade_images');
    }
};
