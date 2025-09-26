<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produit extends Model
{
   use HasFactory;

    //protected $primaryKey = 'idProduit';
    protected $table = 'produit';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $fillable = [
        'categorie_id',
        'nomProduit',
        'categorie',
        'sexeCible',
        'familleOlfactive',
        'quantiteProduit',
        'quantiteAlerte',
        'estDisponible',
        'descriptionProduit',
        'contenanceProduit',
        'prixProduit',
        'imagePrincipale',
        'personnalite',
        'senteur', 
        'modeUtilisation',
        'particularite',
        'ingredient_principal_id',
    ];

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'produit_ingredient', 'produit_id', 'ingredient_id');
    }
     public function categorie()
{
    return $this->belongsTo(Categorie::class, 'categorie_id');
}
// public function commandes()
// {
//     return $this->belongsToMany(Commandes::class, 'commande_produit')
//                 ->withPivot('quantite')
//                 ->withTimestamps();
// }
// app/Models/Produit.php
public function commandes()
{
    return $this->belongsToMany(Commande::class, 'commande_produit', 'produit_id', 'commande_id')
                ->withPivot('quantite')
                ->withTimestamps();
}
public function favoritedBy()
{
    return $this->belongsToMany(User::class, 'favorites', 'produit_id', 'user_id')->withTimestamps();
}
public function ingredientPrincipal()
{
    return $this->belongsTo(Ingredient::class, 'ingredient_principal_id');
}

}
