<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $fillable = ['user_id', 'produit_id', 'quantite', 'accessoire_id','service_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function produit() {
        return $this->belongsTo(Produit::class);
    }
    public function accessoire()
{
    return $this->belongsTo(Accessoires::class, 'accessoire_id');
}
public function service()
{
    return $this->belongsTo(\App\Models\Service::class, 'service_id');
}

}

