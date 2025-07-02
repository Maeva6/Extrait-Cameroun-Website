<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia; // N'oubliez pas d'importer Inertia

class ClientController extends Controller
{
    public function index1()
    {
        // Récupère tous les utilisateurs avec le rôle 'client'
        $clients = User::where('role', 'client')->get();
        
        return response()->json($clients);
    }

    public function index()
    {
        return Inertia::render('Client/Index', [
            'clients' => User::where('role', 'client')
                           ->orderBy('created_at', 'desc')
                           ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Client/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string'
        ]);
    
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);
    
         return response()->json(['message' => 'Client créé avec succès']);
    }

    public function destroy($id)
    {
        $client = User::findOrFail($id);
        $client->delete();
        
        return response()->json(['message' => 'Client supprimé avec succès']);
    }
}