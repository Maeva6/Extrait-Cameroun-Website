<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accessoires extends Model
{
    protected $fillable = [
        'nomAccessoire',
        'slug',
        'description',
        'guideUtilisation',
        'guideProduits',
        'prixAccessoire',
        'capacite',
        'imageUrl',
        'categorie',
        'available',
    ];
    public function commandes()
{
    return $this->belongsToMany(Commande::class, 'commande_accessoire')
        ->withPivot('quantite')
        ->withTimestamps();
}

}
