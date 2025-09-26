<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use App\Models\Reapprovisionnement;

class IngredientController extends Controller
{
    public function index()
    {
        $ingredients = Ingredient::all();
        return response()->json($ingredients);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nomIngredient' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fournisseur' => 'required|string|max:255',
            'stockActuel' => 'required|integer',
            'prix' => 'required|numeric',
            'seuilAlerte' => 'required|integer',
            'categorie' => 'required|string|max:255',
            'photo' => 'nullable|string',
            'etat_physique' => 'required|in:liquide,solide,gazeux',
        ]);

        Ingredient::create($validatedData);

        return response()->json(['message' => 'Ingredient created successfully'], 201);
    }

    public function reapprovisionner(Request $request, $id)
    {
        $request->validate([
            'quantiteAjoutee' => 'required|integer|min:1',
        ]);

        $ingredient = Ingredient::findOrFail($id);
        $ingredient->stockActuel += $request->quantiteAjoutee;
        $ingredient->save();

        Reapprovisionnement::create([
            'ingredient_id' => $ingredient->id,
            'quantite_ajoutee' => $request->quantiteAjoutee,
            'date_reapprovisionnement' => now(),
        ]);

        return response()->json(['success' => true, 'message' => 'Stock mis à jour avec succès']);
    }
    public function list()
{
    return response()->json(
        Ingredient::select('id', 'nomIngredient as name', 'photo')
            ->orderBy('nomIngredient')
            ->get()
            ->map(function ($ingredient) {
                return [
                    'id' => $ingredient->id,
                    'name' => $ingredient->name,
                    'image' => $ingredient->photo
                ];
            })
    );
}

//     public function show($id)
// {
//     $ingredient = Ingredient::find($id);
    
//     if (!$ingredient) {
//         return response()->json(['message' => 'Ingredient not found'], 404);
//     }
    
//     return response()->json($ingredient);
// }
 public function show($id)
    {
        $ingredient = Ingredient::find($id);
        
        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }
        
        // Retournez explicitement les données avec photo_url
        return response()->json([
            'id' => $ingredient->id,
            'nomIngredient' => $ingredient->nomIngredient,
            'description' => $ingredient->description,
            'fournisseur' => $ingredient->fournisseur,
            'stockActuel' => $ingredient->stockActuel,
            'prix' => $ingredient->prix,
            'seuilAlerte' => $ingredient->seuilAlerte,
            'categorie' => $ingredient->categorie,
            'photo' => $ingredient->photo_url, // Utilisez l'accesseur ici
            'etat_physique' => $ingredient->etat_physique,
            'created_at' => $ingredient->created_at,
            'updated_at' => $ingredient->updated_at
        ]);
    }
public function import(Request $request)
    {
        $importData = $request->json()->all();
        $errors = [];
        $successCount = 0;
    
        foreach ($importData as $index => $ingredientData) {
            // Normalisation des noms de champs (important pour la correspondance)
            $data = [
                'nomIngredient' => $ingredientData['Nom de l\'ingrédient'] ?? $ingredientData['nomIngredient'] ?? null,
                'description' => $ingredientData['Description'] ?? $ingredientData['description'] ?? null,
                'fournisseur' => $ingredientData['Fournisseur'] ?? $ingredientData['fournisseur'] ?? null,
                'stockActuel' => $ingredientData['Stock Actuel'] ?? $ingredientData['stockActuel'] ?? null,
                'prix' => $ingredientData['Prix'] ?? $ingredientData['prix'] ?? null,
                'seuilAlerte' => $ingredientData['Seuil d\'alerte'] ?? $ingredientData['seuilAlerte'] ?? null,
                'categorie' => $ingredientData['Catégorie'] ?? $ingredientData['categorie'] ?? null,
                'photo' => $ingredientData['Photo'] ?? $ingredientData['photo'] ?? null,
                'etat_physique' => strtolower($ingredientData['État physique'] ?? $ingredientData['etat_physique'] ?? null),
            ];
    
            $validator = Validator::make($data, [
                'nomIngredient' => 'required|string|max:255',
                'description' => 'nullable|string',
                'fournisseur' => 'required|string|max:255',
                'stockActuel' => 'required|integer|min:0',
                'prix' => 'required|numeric|min:0',
                'seuilAlerte' => 'required|integer|min:0',
                'categorie' => 'required|string|max:255',
                'photo' => 'nullable|string',
                'etat_physique' => 'required|in:liquide,solide,gazeux',
            ]);
    
            if ($validator->fails()) {
                $errors["Ligne " . ($index + 1)] = $validator->errors()->all();
                continue;
            }
    
            try {
                Ingredient::create($data);
                $successCount++;
            } catch (\Exception $e) {
                $errors["Ligne " . ($index + 1)] = ["Erreur lors de la création : " . $e->getMessage()];
            }
        }
    
        $response = [
            'success' => empty($errors),
            'imported_count' => $successCount,
            'error_count' => count($errors),
        ];
    
        if (!empty($errors)) {
            $response['message'] = $errorCount . ' erreur(s) lors de l\'importation';
            $response['errors'] = $errors;
            return response()->json($response, 422);
        }
    
        return response()->json([
            'message' => 'Tous les ingrédients (' . $successCount . ') ont été importés avec succès'
        ]);
    }

} 
