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

    // public function reapprovisionner(Request $request, $id)
    // {
    //     $request->validate([
    //         'quantiteAjoutee' => 'required|integer|min:1',
    //     ]);

    //     $ingredient = Ingredient::findOrFail($id);
    //     $ingredient->stockActuel += $request->quantiteAjoutee;
    //     $ingredient->save();

    //     Reapprovisionnement::create([
    //         'ingredient_id' => $ingredient->id,
    //         'quantite_ajoutee' => $request->quantiteAjoutee,
    //         'date_reapprovisionnement' => now(),
    //     ]);

    //     return response()->json(['success' => true, 'message' => 'Stock mis à jour avec succès']);
    // }
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
} 
