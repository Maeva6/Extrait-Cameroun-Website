<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categorie extends Model
{
    use HasFactory;
    protected $table = 'categorie';
    protected $fillable = ['nomCategorie']; // Adapté à votre schéma de base de données

    // Relation inverse vers les produits
    public function produits()
    {
        return $this->hasMany(Produit::class, 'categorie_id');
 }
 public function categorie()
{
    return $this->belongsTo(Categorie::class, 'idCategorie');
}
public function services()
{
    return $this->hasMany(Service::class);
}

}