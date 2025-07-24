<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function bodyPerfume()
    
{
    // On récupère tous les produits dont la senteur contient "corporelle"
    $produits = Produit::with(['categorie', 'ingredients'])
        ->whereRaw('LOWER(senteur) LIKE ?', ['%corporelle%']) // insensible à la casse
        ->get();

    $produitsTransformes = $produits->map(function ($produit) {
        return [
            'id' => $produit->id,
            'nomProduit' => $produit->nomProduit,
            'prixProduit' => $produit->prixProduit,
            'contenanceProduit' => $produit->contenanceProduit,
            'descriptionProduit' => $produit->descriptionProduit,
            'modeUtilisation' => $produit->modeUtilisation,
            'particularite' => $produit->particularite,
            'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
            'imagePrincipale' => $produit->imagePrincipale,
            'senteur' => $produit->senteur,
            'estDisponible' => $produit->quantiteProduit > 0 && $produit->estDisponible,
                'limited' => $produit->quantiteProduit < 10 && $produit->quantiteProduit > 0,
            'ingredients' => $produit->ingredients->map(function ($ing) {
                return [
                    'id' => $ing->id,
                    'nomIngredient' => $ing->nomIngredient,
                    'imageIngredient' => $ing->photo,
                ];
            }),
        ];
    });

    return Inertia::render('BodyPerfume', [
        'products' => $produitsTransformes,
    ]);
}

public function homeFragrance()
    
{
    // On récupère tous les produits dont la senteur contient "ambiance"
    $produits = Produit::with(['categorie', 'ingredients'])
        ->whereRaw('LOWER(senteur) LIKE ?', ['%ambiance%']) // insensible à la casse
        ->get();

    $produitsTransformes = $produits->map(function ($produit) {
        return [
            'id' => $produit->id,
            'nomProduit' => $produit->nomProduit,
            'prixProduit' => $produit->prixProduit,
            'contenanceProduit' => $produit->contenanceProduit,
            'descriptionProduit' => $produit->descriptionProduit,
            'modeUtilisation' => $produit->modeUtilisation,
            'particularite' => $produit->particularite,
            'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
            'imagePrincipale' => $produit->imagePrincipale,
            'senteur' => $produit->senteur,
            'estDisponible' => $produit->quantiteProduit > 0 && $produit->estDisponible,
                'limited' => $produit->quantiteProduit < 10 && $produit->quantiteProduit > 0,
            'ingredients' => $produit->ingredients->map(function ($ing) {
                return [
                    'id' => $ing->id,
                    'nomIngredient' => $ing->nomIngredient,
                    'imageIngredient' => $ing->photo,
                ];
            }),
        ];
    });

    return Inertia::render('HomeFragrance', [
        'products' => $produitsTransformes,
    ]);
}
public function cosmetiques()
{
    $produits = Produit::with(['categorie', 'ingredients'])
        ->whereRaw('LOWER(senteur) LIKE ?', ['%cosmetique%'])
        ->get();

    $produitsTransformes = $produits->map(function ($produit) {
        return [
            'id' => $produit->id,
            'nomProduit' => $produit->nomProduit,
            'prixProduit' => $produit->prixProduit,
            'contenanceProduit' => $produit->contenanceProduit,
            'descriptionProduit' => $produit->descriptionProduit,
            'modeUtilisation' => $produit->modeUtilisation,
            'particularite' => $produit->particularite,
            'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
            'imagePrincipale' => $produit->imagePrincipale,
            'senteur' => $produit->senteur,
            'estDisponible' => $produit->quantiteProduit > 0 && $produit->estDisponible,
            'limited' => $produit->quantiteProduit < 10 && $produit->quantiteProduit > 0,
            'ingredients' => $produit->ingredients->map(function ($ing) {
                return [
                    'id' => $ing->id,
                    'nomIngredient' => $ing->nomIngredient,
                    'imageIngredient' => $ing->photo,
                ];
            }),
        ];
    });

    return Inertia::render('Cosmetiques', [
        'products' => $produitsTransformes,
    ]);
}


    public function show($id)
    {
        $produit = Produit::with('categorie', 'ingredients')->findOrFail($id);

        return Inertia::render('ProductPage', [
            'product' => [
                'id' => $produit->id,
                'nomProduit' => $produit->nomProduit,
                'prixProduit' => $produit->prixProduit,
                'contenanceProduit' => $produit->contenanceProduit,
                'descriptionProduit' => $produit->descriptionProduit,
                'modeUtilisation' => $produit->modeUtilisation,
                'particularite' => $produit->particularite,
                'imagePrincipale' => $produit->imagePrincipale,
                'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
                'ingredients' => $produit->ingredients->map(function ($ing) {
                    return [
                        'id' => $ing->id,
                        'nomIngredient' => $ing->nomIngredient,
                        'imageIngredient' => $ing->photo,
                    ];
                }),
            ]
        ]);
    }
}

// public function bodyPerfume()
// {
//     $products = Produit::all(); // Ou ta requête avec filtre
//     return Inertia::render('BodyPerfume', [
//         'products' => $products,
//     ]);
// }
