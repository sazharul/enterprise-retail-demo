<?php

namespace App\Models;

use App\Models\OfferUpToSale;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Offer extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'color',
        'banner_web',
        'banner_mobile',
        'offer_type_id',
        'is_free_delivery',
        'min_amount',
        'max_amount',
        'start_date',
        'expiry_date',
        'status',
    ];

    public function UptoSales()
    {
        return $this->hasMany(OfferUpToSale::class);
    }
    public function offerCombos()
    {
        return $this->hasMany(OfferCombo::class);
    }

}
