<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomFournisseur' => 'required|string|max:255',
            'contactTel' => 'nullable|string|max:20',
            'adresseMail' => 'nullable|email|max:255',
            'adresseBoutique' => 'nullable|string',
            'categorieProduit' => 'nullable|string|in:Alimentaire,Boissons,Épicerie,Produits frais,Matériel,Équipement,Services,Autres',
            'siteWeb' => 'nullable|url|max:255',
            'note' => 'nullable|integer|between:1,5'
        ]);

        $fournisseur = Fournisseur::create([
            'nom_fournisseur' => $validated['nomFournisseur'],
            'contact_tel' => $validated['contactTel'],
            'adresse_mail' => $validated['adresseMail'],
            'adresse_boutique' => $validated['adresseBoutique'],
            'categorie_produit' => $validated['categorieProduit'],
            'site_web' => $validated['siteWeb'],
            'note' => $validated['note']
        ]);

        return response()->json($fournisseur, 201);
    }

    // app/Http/Controllers/FournisseurController.php
public function index()
{
    return Fournisseur::all();
}

public function destroy($id)
{
    $fournisseur = Fournisseur::findOrFail($id);
    $fournisseur->delete();
    return response()->json(null, 204);
}

// Dans FournisseurController.php
public function show($id)
{
    $fournisseur = Fournisseur::find($id);
    
    if (!$fournisseur) {
        return response()->json([
            'success' => false,
            'message' => 'Fournisseur non trouvé'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $fournisseur
    ]);
}

}