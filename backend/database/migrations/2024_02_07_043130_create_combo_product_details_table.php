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
        Schema::create('combo_product_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('combo_product_id')->nullable()->constrained('combo_products');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combo_product_details');
    }
};
