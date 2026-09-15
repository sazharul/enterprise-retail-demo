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
        Schema::create('offer_combos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->nullable()->constrained('offers');
            $table->foreignId('combo_product_id')->nullable()->constrained('combo_products');
            $table->boolean('status')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offer_combos');
    }
};
