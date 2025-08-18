<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class RecommendationController extends Controller
{
//     public function result(Request $request)
//     {
//         $personnalite = $request->input('personnalite');
//         $senteurs = $request->input('senteurs', []);

//         if (!$personnalite || empty($senteurs)) {
//             return response()->json(['error' => 'Paramètres incomplets'], 400);
//         }

//         // Calcul de pertinence
//         $produits = Produit::with(['categorie', 'ingredients'])
//             ->get()
//             ->map(function ($produit) use ($personnalite, $senteurs) {
//                 $score = 0;

//                 if (stripos($produit->personnalite, $personnalite) !== false) {
//                     $score += 2;
//                 }

//                 $produitSenteurs = collect($produit->ingredients)->pluck('nomIngredient')->map('strtolower');
//                 foreach ($senteurs as $senteur) {
//                     if ($produitSenteurs->contains(mb_strtolower($senteur))) {
//                         $score += 1;
//                     }
//                 }

//                 $produit->matchScore = $score;
//                 return $produit;
//             })
//             ->filter(fn ($p) => $p->matchScore > 0)
//             ->sortByDesc('matchScore')
//             ->values();

//         // Produit sélectionné ou fallback
//         $produit = $produits->first() ?? Produit::with(['categorie', 'ingredients'])->inRandomOrder()->first();

//         if (
//             !$produit ||
//             !$produit->nomProduit ||
//             !$produit->imagePrincipale ||
//             !$produit->prixProduit ||
//             !$produit->contenanceProduit
//         ) {
//             return response()->json(null, 404);
//         }

//         return response()->json([
//             'nomProduit' => $produit->nomProduit,
//             'imagePrincipale' => $produit->imagePrincipale,
//             'prixProduit' => $produit->prixProduit,
//             'contenanceProduit' => $produit->contenanceProduit,
//             'descriptionProduit' => $produit->descriptionProduit,
//             'modeUtilisation' => $produit->modeUtilisation,
//             'particularite' => $produit->particularite,
//             'matchScore' => $produit->matchScore ?? 0,
//             'categorie' => [
//                 'name' => optional($produit->categorie)->name
//             ],
//             'ingredients' => $produit->ingredients->map(fn ($i) => [
//                 'nomIngredient' => $i->nomIngredient,
//             ]),
//         ]);
//     }
// 
// public function result(Request $request)
//  {
//     $personnalite = $request->input('personality'); // correspond à la clé envoyée depuis le frontend

//     if (!$personnalite) {
//         return response()->json(['error' => 'Personnalité manquante'], 400);
//     }

//     // Recherche des produits qui matchent avec la personnalité
//    $produits = Produit::with(['categorie', 'ingredients'])
//     ->where('categorie_id', 5)
//     ->get()
//     ->map(function ($produit) use ($personnalite) {
//         $score = 0;
//         if (stripos($produit->personnalite, $personnalite) !== false) {
//             $score += 2;
//         }
//         $produit->matchScore = $score;
//         return $produit;
//     })
//     ->filter(fn ($p) => $p->matchScore > 0)
//     ->sortByDesc('matchScore')
//     ->values();

//     // Produit recommandé ou aléatoire si aucun match
//     $produit = $produits->first() ?? Produit::with(['categorie', 'ingredients'])->inRandomOrder()->first();

//     if (
//         !$produit ||
//         !$produit->nomProduit ||
//         !$produit->imagePrincipale ||
//         !$produit->prixProduit ||
//         !$produit->contenanceProduit
//     ) {
//         return response()->json(null, 404);
//     }

//     return response()->json([
//         'nomProduit' => $produit->nomProduit,
//         'imagePrincipale' => $produit->imagePrincipale,
//         'prixProduit' => $produit->prixProduit,
//         'contenanceProduit' => $produit->contenanceProduit,
//         'descriptionProduit' => $produit->descriptionProduit,
//         'modeUtilisation' => $produit->modeUtilisation,
//         'particularite' => $produit->particularite,
//         'matchScore' => $produit->matchScore ?? 0,
//         'categorie' => [
//             'name' => optional($produit->categorie)->name
//         ],
//         'ingredients' => $produit->ingredients->map(fn ($i) => [
//             'nomIngredient' => $i->nomIngredient,
//         ]),
//     ]);
// }
public function result(Request $request)
{
    Log::info('Méthode result appelée', $request->all());
    // ...
    // 1. Récupérer la personnalité depuis la requête
    $personnalite = $request->input('personality');

    if (!$personnalite) {
        return response()->json(['error' => 'Personnalité manquante'], 400);
    }

    // 2. Trouver un produit aléatoire qui correspond à la personnalité
    $produitPrincipal = Produit::where('personnalite', $personnalite)
        ->where('estDisponible', true)
        ->inRandomOrder()
        ->first();

    if (!$produitPrincipal) {
        return response()->json(['error' => 'Aucun produit trouvé pour cette personnalité'], 404);
    }

    // 3. Récupérer l'ingrédient principal via la relation
    $ingredient = $produitPrincipal->ingredientPrincipal;

    if (!$ingredient) {
        return response()->json(['error' => 'Aucun ingrédient principal trouvé pour ce produit'], 404);
    }

    // 4. Rechercher tous les produits avec cet ingrédient principal
    $produitsSimilaires = Produit::with(['categorie', 'ingredients'])
        ->where('ingredient_principal_id', $ingredient->id)
        ->where('estDisponible', true)
        ->get();

    // 5. Formater les résultats à renvoyer au frontend
    $resultats = $produitsSimilaires->map(function ($produit) {
        return [
            'id' => $produit->id,
            'nomProduit' => $produit->nomProduit,
            'imagePrincipale' => $produit->imagePrincipale,
            'prixProduit' => $produit->prixProduit,
            'contenanceProduit' => $produit->contenanceProduit,
            'descriptionProduit' => $produit->descriptionProduit,
            'modeUtilisation' => $produit->modeUtilisation,
            'particularite' => $produit->particularite,
            'personnalite' => $produit->personnalite,
            'categorie' => [
                'name' => optional($produit->categorie)->name
            ],
            'ingredients' => $produit->ingredients->map(fn ($i) => [
                'nomIngredient' => $i->nomIngredient,
            ]),
        ];
    });

    // 6. Retourner les données JSON au frontend
    return response()->json([
        'produitInitial' => $produitPrincipal->nomProduit,
        'ingredientPrincipal' => $ingredient->nomIngredient ?? null,
        'produitsRecommandes' => $resultats
    ]);
}


}