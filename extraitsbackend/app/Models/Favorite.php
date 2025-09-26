<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorites';

    protected $fillable = ['user_id', 'produit_id', 'service_id', 'accessoire_id'];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function accessoire()
    {
        return $this->belongsTo(Accessoires::class, 'accessoire_id');
    }
}


