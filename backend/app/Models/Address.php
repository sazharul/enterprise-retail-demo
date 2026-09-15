<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['name','phone','email','address','district_id','city_id','status','user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function districts()
    {
        return $this->hasMany(District::class);
    }

    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
