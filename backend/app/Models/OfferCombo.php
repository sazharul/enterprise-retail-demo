<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OfferCombo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'offer_id',
        'combo_product_id',
        'status',
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }

    public function comboProducts()
    {
        return $this->belongsTo(ComboProduct::class,'combo_product_id');
    }


}
