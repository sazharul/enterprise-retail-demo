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
        Schema::create('offer_up_to_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products');
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('brand_id')->nullable()->constrained('brands');
            $table->foreignId('offer_id')->constrained('offers');
            $table->foreignId('product_shade_id')->nullable()->constrained('product_shades');
            $table->foreignId('product_size_id')->nullable()->constrained('product_sizes');
            $table->double('current_price')->default(0);
            $table->double('discounted_price')->nullable()->default(0);
            $table->double ('flat_discount')->nullable()->default(0);
            $table->double ('percent_discount')->nullable()->default(0);
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offer_up_to_sales');
    }
};
