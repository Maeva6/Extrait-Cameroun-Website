<?php
// app/Http/Controllers/ReapprovisionnementController.php

namespace App\Http\Controllers;

use App\Models\Reapprovisionnement;
use Illuminate\Http\Request;

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

}
