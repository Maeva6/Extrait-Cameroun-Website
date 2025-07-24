<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorites';

    protected $fillable = ['user_id', 'produit_id'];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
}


