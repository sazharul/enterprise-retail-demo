<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeletionPolicy extends Model
{
    use HasFactory;
    protected $fillable = ['document'];
}
