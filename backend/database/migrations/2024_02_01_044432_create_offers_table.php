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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color');
            $table->text('banner_web')->nullable();
            $table->text('banner_mobile')->nullable();
            $table->unsignedBigInteger('offer_type_id');
            $table->boolean('is_free_delivery')->default(0);  //1=uptoSale ,2=combo
            $table->double('min_amount')->nullable();
            $table->double('max_amount')->nullable();
            $table->date('start_date')->default(now());
            $table->date('expiry_date')->nullable();
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
        Schema::dropIfExists('offers');
    }
};
