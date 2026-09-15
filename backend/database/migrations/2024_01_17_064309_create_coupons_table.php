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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code');
            $table->double('amount',8, 2);
            $table->double('minimum_expenses',8, 2)->nullable();
            $table->double('max_expenses',8, 2)->nullable();
            $table->date('expire_date');
            $table->tinyInteger('discount_type')->default(0); // 0 = Fixed , 1= Percentage
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
