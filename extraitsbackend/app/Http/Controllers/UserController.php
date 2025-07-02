<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('User/UserDashboard', [
            'auth' => [
                'user' => $user,
            ],
            'favorites' => $user->favorites()->with('ingredients')->take(3)->get(),
            'orders' => $user->orders()->with('produits')->take(3)->get(),
        ]);
    }
    public function create()
{
    $clients = User::where('role', 'client')->select('id', 'nom', 'email', 'adresse', 'numero')->get();
    $produits = Produit::select('id', 'nom', 'prix')->get();

    return Inertia::render('formulaire/formulaireCommande', [
        'clients' => $clients,
        'produits' => $produits,
    ]);
}
public function recupeEmployes()
{
    $employes = User::where('role', 'employe')->get();
    return response()->json(['users' => $employes]);
}

public function updatePermissions(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Assurez-vous que permissions est bien un tableau
    $permissions = $request->input('permissions', []);

    if (!is_array($permissions)) {
        return response()->json(['error' => 'Permissions must be an array.'], 400);
    }

    // Stocker sous forme de JSON (ou relation, selon ton modèle)
    $user->permissions = json_encode($permissions);
    $user->save();

    return response()->json(['success' => true, 'message' => 'Permissions mises à jour avec succès.']);
}
public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
    
        // Force le rôle à 'employe' indépendamment de ce qui pourrait être envoyé
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'employe' // Forcé explicitement
        ]);
    
        return redirect()->back()->with('success', 'Employé créé avec succès');
    }
}
