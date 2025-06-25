<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;

class RecommendationController extends Controller
{

public function result(Request $request)
{
    $personnalite = $request->input('personnalite');
    $senteurs = $request->input('senteurs', []);

    $produit = Produit::with(['categorie', 'ingredients'])
    ->where('personnalite', 'LIKE', "%$personnalite%")
    ->whereExists(function ($query) use ($senteurs) {
        $query->select(\DB::raw(1))
              ->from('ingredients')
              ->join('produit_ingredient', 'ingredients.id', '=', 'produit_ingredient.ingredient_id')
              ->whereColumn('produit.id', 'produit_ingredient.produit_id')
              ->where(function ($q) use ($senteurs) {
                  foreach ($senteurs as $senteur) {
                      $q->orWhere('ingredients.nomIngredient', 'LIKE', "%$senteur%");
                  }
              });
    })
    ->orderBy('created_at', 'desc')
    ->first();


    if (!$produit) {
        return response()->json(null, 404);
    }

    return response()->json([
        'nomProduit' => $produit->nomProduit,
        'imagePrincipale' => $produit->imagePrincipale,
        'prixProduit' => $produit->prixProduit,
        'contenanceProduit' => $produit->contenanceProduit,
        'descriptionProduit' => $produit->descriptionProduit,
        'modeUtilisation' => $produit->modeUtilisation,
        'particularite' => $produit->particularite,
        'categorie' => [
            'name' => optional($produit->categorie)->name
        ],
        'ingredients' => $produit->ingredients->map(function ($ingredient) {
            return [
                'nomIngredient' => $ingredient->nomIngredient,
            ];
        }),
    ]);
}

}
