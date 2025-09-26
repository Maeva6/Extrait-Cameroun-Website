<?php
// app/Http/Controllers/ReapprovisionnementController.php

namespace App\Http\Controllers;

use App\Models\Reapprovisionnement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Ingredient;

class ReapprovisionnementController extends Controller
{
    
    public function index()
    {
        try {
            $reapprovisionnements = Reapprovisionnement::with('ingredient')->get()
                ->map(function ($reappro) {
                    return [
                        'Id' => $reappro->id,
                        'nomIngredient' => $reappro->ingredient->nomIngredient ?? 'Inconnu',
                        'quantite' => $reappro->quantite_ajoutee,
                        'dateReapprovisionnement' => $reappro->date_reapprovisionnement,
                        'fournisseur' => $reappro->ingredient->fournisseur ?? 'Inconnu' // Utilise le champ string directement
                    ];
                });
                
            return response()->json($reapprovisionnements);
        } catch (\Exception $e) {
            \Log::error('Erreur API:', ['message' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
{
    try {
        $reapprovisionnement = Reapprovisionnement::with('ingredient')->find($id);

        if (!$reapprovisionnement) {
            return response()->json(['message' => 'Reapprovisionnement non trouvé'], 404);
        }

        return response()->json([
            'Id' => $reapprovisionnement->id,
            'nomIngredient' => $reapprovisionnement->ingredient->nomIngredient ?? 'Inconnu',
            'quantite' => $reapprovisionnement->quantite_ajoutee,
            'dateReapprovisionnement' => $reapprovisionnement->date_reapprovisionnement,
            'fournisseur' => $reapprovisionnement->ingredient->fournisseur ?? 'Inconnu'
        ]);

    } catch (\Exception $e) {
        \Log::error('Erreur API:', ['message' => $e->getMessage()]);
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
public function import(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->input('data');
            
            if (empty($data)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucune donnée à importer'
                ], 400);
            }

            $errors = [];
            $importedCount = 0;

            foreach ($data as $index => $row) {
                try {
                    // Validation des données
                    if (!isset($row['ingredient_id']) || !isset($row['quantite_ajoutee'])) {
                        throw new \Exception('ID et quantité sont obligatoires');
                    }

                    $ingredientId = (int)$row['ingredient_id'];
                    $quantite = (float)$row['quantite_ajoutee'];

                    if ($ingredientId <= 0) {
                        throw new \Exception('ID d\'ingrédient invalide');
                    }

                    if ($quantite <= 0) {
                        throw new \Exception('La quantité doit être positive');
                    }

                    // Mise à jour directe du stock
                    $affected = DB::table('ingredients')
                        ->where('id', $ingredientId)
                        ->increment('stockActuel', $quantite);

                    if ($affected === 0) {
                        throw new \Exception('Ingrédient non trouvé');
                    }

                    // Enregistrement du réapprovisionnement
                    Reapprovisionnement::create([
                        'ingredient_id' => $ingredientId,
                        'quantite_ajoutee' => $quantite,
                        'date_reapprovisionnement' => now(),
                        'fournisseur' => $row['fournisseur'] ?? null
                    ]);

                    $importedCount++;
                } catch (\Exception $e) {
                    $errors[] = [
                        'line' => $index + 1,
                        'message' => $e->getMessage(),
                        'data' => $row
                    ];
                }
            }

            if (!empty($errors)) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs lors de l\'import',
                    'errors' => $errors
                ], 422);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => "$importedCount réapprovisionnements importés avec succès",
                'count' => $importedCount
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur: ' . $e->getMessage()
            ], 500);
        }
    }
}
