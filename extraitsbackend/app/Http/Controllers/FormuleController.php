<?php

namespace App\Http\Controllers;

use App\Models\Formule;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormuleController extends Controller
{
    /**
     * Liste toutes les formules avec les relations nécessaires
     */
    public function index()
    {
        $formules = Formule::with(['produit', 'ingredients'])
            ->select([
                'id',
                'nom_formule as nomFormule',
                'description',
                'produit_id',
                'instructions',
                'createur',
                'created_at as dateCreation'
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($formules);
    }

    /**
     * Crée une nouvelle formule avec produit associé et ingrédients
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nomFormule' => 'required|string|max:255',
            'description' => 'nullable|string',
            'produitFiniId' => 'required|exists:produit,id',
            'instructions' => 'nullable|string',
            'createur' => 'nullable|string|max:255',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredientId' => 'required|exists:ingredients,id',
            'ingredients.*.quantite' => 'required|numeric|min:0.01',
            'ingredients.*.unite' => 'required|string|max:10',
        ]);

        try {
            DB::beginTransaction();

            $formule = Formule::create([
                'nom_formule' => $validatedData['nomFormule'],
                'description' => $validatedData['description'] ?? null,
                'produit_id' => $validatedData['produitFiniId'],
                'instructions' => $validatedData['instructions'] ?? null,
                'createur' => $validatedData['createur'] ?? null,
            ]);

            $ingredientsData = [];
            foreach ($validatedData['ingredients'] as $ingredient) {
                $ingredientsData[$ingredient['ingredientId']] = [
                    'quantite' => $ingredient['quantite'],
                    'unite' => $ingredient['unite'],
                ];
            }

            $formule->ingredients()->attach($ingredientsData);

            DB::commit();

            return response()->json([
                'message' => 'Formule créée avec succès',
                'formule' => $formule->load(['produit', 'ingredients'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de la formule',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprime une formule et détache ses ingrédients
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $formule = Formule::findOrFail($id);
            $formule->ingredients()->detach();
            $formule->delete();

            DB::commit();

            return response()->json(['message' => 'Formule supprimée avec succès']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Retourne les ingrédients d'une formule
     */
    public function getIngredients(Formule $formule)
    {
        try {
            $ingredients = $formule->ingredients()
                ->withPivot('quantite', 'unite')
                ->get();
            
            return response()->json($ingredients);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des ingrédients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Nouvelle méthode pour récupérer les formules d'un produit
     */
    public function getFormuleByProduit($produitId)
    {
        try {
            $formule = Formule::with('ingredients')
                ->where('produit_id', $produitId)
                ->firstOrFail();
            
            return response()->json($formule);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Aucune formule trouvée pour ce produit',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function show($id)
{
    try {
        $formule = Formule::with(['produit', 'ingredients'])->findOrFail($id);
        return response()->json($formule);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Formule non trouvée',
            'error' => $e->getMessage()
        ], 404);
    }
}

}