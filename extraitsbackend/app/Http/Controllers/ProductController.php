<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function bodyPerfume()
    {
        // On récupère tous les produits de la catégorie "Parfum de corps"
        $produits = Produit::whereHas('categorie', function ($query) {
            $query->where('name', 'Parfum de corps');
        })->with(['categorie', 'ingredients'])->get();

        $produitsTransformes = $produits->map(function ($produit) {
            return [
                'id' => $produit->id,
                'nomProduit' => $produit->nomProduit,
                'prixProduit' => $produit->prixProduit,
                'contenanceProduit' => $produit->contenanceProduit,
                'descriptionProduit' => $produit->descriptionProduit,
                'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
                'imagePrincipale' => $produit->imagePrincipale,
                'ingredients' => $produit->ingredients->map(function ($ing) {
                    return [
                        'id' => $ing->id,
                        'nomIngredient' => $ing->nomIngredient,
                        'imageIngredient' => $ing->imageIngredient,
                    ];
                }),
            ];
        });

        return Inertia::render('BodyPerfume', [
            'products' => $produitsTransformes
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
                'imagePrincipale' => $produit->imagePrincipale,
                'categorie' => ['name' => $produit->categorie->name ?? 'Inconnue'],
                'ingredients' => $produit->ingredients->map(function ($ing) {
                    return [
                        'id' => $ing->id,
                        'nomIngredient' => $ing->nomIngredient,
                        'imageIngredient' => $ing->imageIngredient,
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
