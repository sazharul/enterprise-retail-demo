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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('slug');
            $table->foreignId('brand_id')->nullable()->constrained('brands');
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('sub_category_id')->nullable()->constrained('categories');
            $table->foreignId('sub_sub_category_id')->nullable()->constrained('categories');
            $table->json('size_id')->nullable();
            $table->json('shade_id')->nullable();
            $table->json('preference_id')->nullable();
            $table->foreignId('formulation_id')->nullable()->constrained('formulations');
            $table->json('finish_id')->nullable();
            $table->foreignId('country_id')->nullable()->constrained('countries');
            $table->json('gender_id')->nullable();
            $table->json('ingredient_id')->nullable();
            $table->foreignId('coverage_id')->nullable()->constrained('coverages');
            $table->json('benefit_id')->nullable();
            $table->json('concern_id')->nullable();
            $table->foreignId('skin_type_id')->nullable()->constrained('skin_types');
            $table->json('pack_id')->nullable();
            $table->longText('faq')->nullable();
            $table->string('variation_type')->nullable();
            $table->double('price', 10, 2)->default(0);
            $table->double('discount_amount', 10, 2)->default(0);
            $table->double('discount_percent', 10, 2)->default(0);
            $table->double('discount_price', 10, 2)->default(0);
            $table->string('image')->nullable();
            $table->double('tax', 10, 2)->default(0);
            $table->longText('short_description')->nullable();
            $table->longText('ingredient_description')->nullable();
            $table->longText('description')->nullable();
            $table->longText('how_to_use')->nullable();
            $table->boolean('is_free_delivery')->default(0);
            $table->boolean('is_combo')->default(0);
            $table->boolean('status')->default(1);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
