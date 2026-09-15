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
        Schema::create('combo_product_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('combo_product_id')->nullable()->constrained('combo_products');
            $table->foreignId('combo_product_detail_id')->nullable()->constrained('combo_product_details');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('offer_id')->nullable()->constrained('offers');
            $table->double('actual_price', 10, 2)->default(0);
            $table->double('price', 10, 2)->default(0);
            $table->unsignedBigInteger('size_id')->nullable();
            $table->unsignedBigInteger('shade_id')->nullable();
            $table->unsignedBigInteger('quantity')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combo_product_infos');
    }
};
