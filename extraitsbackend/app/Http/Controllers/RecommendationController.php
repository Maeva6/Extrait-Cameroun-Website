<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Produit;

// class RecommendationController extends Controller
// {

// public function result(Request $request)
// {
//     $personnalite = $request->input('personnalite');
//     $senteurs = $request->input('senteurs', []);

//     $produit = Produit::with(['categorie', 'ingredients'])
//     ->where('personnalite', 'LIKE', "%$personnalite%")
//     ->whereExists(function ($query) use ($senteurs) {
//         $query->select(\DB::raw(1))
//               ->from('ingredients')
//               ->join('produit_ingredient', 'ingredients.id', '=', 'produit_ingredient.ingredient_id')
//               ->whereColumn('produit.id', 'produit_ingredient.produit_id')
//               ->where(function ($q) use ($senteurs) {
//                   foreach ($senteurs as $senteur) {
//                       $q->orWhere('ingredients.nomIngredient', 'LIKE', "%$senteur%");
//                   }
//               });
//     })
//     ->orderBy('created_at', 'desc')
//     ->first();


//     if (!$produit) {
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
//         'categorie' => [
//             'name' => optional($produit->categorie)->name
//         ],
//         'ingredients' => $produit->ingredients->map(function ($ingredient) {
//             return [
//                 'nomIngredient' => $ingredient->nomIngredient,
//             ];
//         }),
//     ]);
// }

// }


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;

class RecommendationController extends Controller
{
    public function result(Request $request)
    {
        $personnalite = $request->input('personnalite');
        $senteurs = $request->input('senteurs', []);

        if (!$personnalite || empty($senteurs)) {
            return response()->json(['error' => 'Paramètres incomplets'], 400);
        }

        // Calcul de pertinence
        $produits = Produit::with(['categorie', 'ingredients'])
            ->get()
            ->map(function ($produit) use ($personnalite, $senteurs) {
                $score = 0;

                if (stripos($produit->personnalite, $personnalite) !== false) {
                    $score += 2;
                }

                $produitSenteurs = collect($produit->ingredients)->pluck('nomIngredient')->map('strtolower');
                foreach ($senteurs as $senteur) {
                    if ($produitSenteurs->contains(mb_strtolower($senteur))) {
                        $score += 1;
                    }
                }

                $produit->matchScore = $score;
                return $produit;
            })
            ->filter(fn ($p) => $p->matchScore > 0)
            ->sortByDesc('matchScore')
            ->values();

        // Produit sélectionné ou fallback
        $produit = $produits->first() ?? Produit::with(['categorie', 'ingredients'])->inRandomOrder()->first();

        if (
            !$produit ||
            !$produit->nomProduit ||
            !$produit->imagePrincipale ||
            !$produit->prixProduit ||
            !$produit->contenanceProduit
        ) {
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
            'matchScore' => $produit->matchScore ?? 0,
            'categorie' => [
                'name' => optional($produit->categorie)->name
            ],
            'ingredients' => $produit->ingredients->map(fn ($i) => [
                'nomIngredient' => $i->nomIngredient,
            ]),
        ]);
    }
}
