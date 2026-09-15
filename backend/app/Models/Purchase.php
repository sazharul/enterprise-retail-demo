<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_no',
        'tax',
        'vat',
        'total_discount',
        'total_quantity',
        'total_amount',
        'grand_total_amount',
        'documents',
        'note',
        'purchase_by',

    ];

    public function admin(){
        return $this->belongsTo(Admin::class, 'purchase_by');
    }
    public function purchaseDetails(){
        return $this->hasMany(PurchaseDetails::class);
    }
}
