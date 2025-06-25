<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categorie|max:255'
        ]);

        $categorie = Categorie::create([
            'name' => $request->name
        ]);

        return response()->json($categorie, 201);
    }
}
