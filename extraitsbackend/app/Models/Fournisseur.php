<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_fournisseur',
        'contact_tel',
        'adresse_mail',
        'adresse_boutique',
        'categorie_produit',
        'site_web',
        'note'
    ];

    protected $casts = [
        'note' => 'integer'
    ];
}