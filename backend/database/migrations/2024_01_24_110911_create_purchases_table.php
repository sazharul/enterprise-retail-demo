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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('purchase_no');
            $table->double('tax')->default(0);
            $table->double('vat')->default(0);
            $table->unsignedBigInteger('total_quantity');
            $table->double('total_discount')->default(0);
            $table->double('total_amount')->default(0);
            $table->double('grand_total_amount')->default(0);
            $table->longText('documents')->nullable();
            $table->longText('note')->nullable();
            $table->unsignedBigInteger('purchase_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
