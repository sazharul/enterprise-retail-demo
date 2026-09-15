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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('order_no');
            $table->integer('quantity');
            $table->text('order_note')->nullable();
            $table->double('total_discount_amount', 10, 2)->default(0);
            $table->double('delivery_charge', 10, 2)->default(0);
            $table->string('coupon_code')->nullable();
            $table->double('coupon_discount', 10, 2)->default(0);
            $table->double('sub_total')->default(0);
            $table->double('grand_total')->default(0);
            $table->double('tax_amount', 10, 2)->default(0);
            $table->integer('reward_points')->default(0);
            $table->integer('status')->default(1)->comment('1 = Pending, 2 = Accepted, 3 = Shipped, 4 = Delivered, 5 = Cancelled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
