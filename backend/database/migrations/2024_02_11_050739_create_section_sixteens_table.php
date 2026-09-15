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
        Schema::create('section_sixteens', function (Blueprint $table) {
            $table->id();
            $table->integer('section_id')->default(16);
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('combo_product_id')->nullable()->constrained('combo_products');
            $table->string('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_sixteens');
    }
};
